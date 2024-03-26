import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { DataTable } from "@/components/dataTable/dataTable";

import useFetch from "@/hooks/useFetch";
import { useAxios } from "@/hooks/useAxios";

import { BudgetForm } from "./budgetForm";
import { PropsBudget, columns } from "./columns";

import { saveAs } from "file-saver";
import { api } from "../../utils/api";

interface IFormInput {
  name: string;
  clientId: string;
  price: string;
  brand: string;
  code: string;
  totalProduct: string;
  totalService: string;
}

interface Item {
  id: string;
  name?: string;
  description?: string;
}

export function Budget() {
  const { budgets } = useFetch();
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedServices, setSelectedServices] = useState<Item[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Item[]>([]);

  const queryClient = useQueryClient();

  const sendBudget = (obj: () => void) =>
    fetchData({
      url: "budget",
      method: "post",
      data: obj,
    });

  const { mutateAsync: sendBudgetFn } = useMutation({
    mutationFn: sendBudget,
    onSuccess(response) {
      queryClient.setQueryData<PropsBudget[]>(["budgets"], (data) => {
        if (Array.isArray(data)) {
          return [...data, response.data];
        }
        return [response.data];
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    console.log(selectedServices);
    console.log(selectedProducts);

    const serviceIds = selectedServices.map((service) => service.id);
    const productIds = selectedProducts.map((product) => product.id);

    const budgetItems = [
      ...serviceIds.map((id) => ({ serviceId: id, quantity: 1 })),
      ...productIds.map((id) => ({ productId: id, quantity: 1 })),
    ];

    const obj = {
      totalProduct: parseInt(data.totalProduct),
      totalService: parseInt(data.totalService),
      clientId: parseInt(data.clientId),
      budgetItems: budgetItems,
    };

    const response = await sendBudgetFn(obj);

    if (response.status === 201) {
      toast.success("Produto adicionado com sucesso!");
      onClose();
    } else {
      toast.error("Falha ao cadastrar produto.");
    }
  };

  const handleButtonClick = async (id: number) => {
    const loadingToast = toast.loading("Gerando orçamento...");

    console.log("Botão clicado na linha com ID:", id);

    const response = await api.get(`/budget/pdf/${id}`, {
      responseType: "blob", // Indica que a resposta é um blob (Binary Large Object)
    });

    // Cria um Blob a partir dos dados recebidos
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Usa o file-saver para realizar o download do Blob como um arquivo PDF
    saveAs(blob, `orçamento${id}.pdf`);

    toast.dismiss(loadingToast);
    if (response.status === 200) {
      toast.success("Arquivo gerado com sucesso!");

      onClose();
    } else {
      toast.error("Falha ao baixar orçamento.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orçamento</h1>
        <Button colorScheme="facebook" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo orçamento
        </Button>

        <Modal size="xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo orçamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <BudgetForm
                onSubmit={onSubmit}
                loading={loading}
                onClose={onClose}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* table */}
      <DataTable
        columns={columns}
        data={budgets}
        onButtonClick={handleButtonClick}
      />
      {/* table */}
    </div>
  );
}
