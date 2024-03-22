import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
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

// import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { useAxios } from "@/hooks/useAxios";
import { Payment, columns } from "./columns";
import { toast } from "sonner";
import { BudgetForm } from "./budgetForm";

interface IFormInput {
  name: string;
  clientId: number;
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
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tableData, setTableData] = useState<Payment[]>([]);

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

    console.log(obj);

    const response = await fetchData({
      url: "budget",
      method: "post",
      data: obj,
    });

    console.log(obj);

    if (response.status === 201) {
      toast.success("Produto adicionado com sucesso!");
      onClose();
      setTableData([...tableData, response]);
    } else {
      toast.error("Falha ao cadastrar produto.");
    }
  };

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      const response = await fetchData({
        url: "budget",
        method: "get",
      });

      setTableData(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

  const handleButtonClick = async (id: number) => {
    console.log("Botão clicado na linha com ID:", id);

    const response = await fetchData({
      url: `/budget/pdf/${id}`,
      method: "get",
    });

    console.log(response);

    if (response.status === 201) {
      toast.success("Arquivo gerado com sucesso!");
      // setTableData([...tableData, response.data]);
      onClose();
    } else {
      toast.error("Falha ao cadastrar cliente.");
    }
    // Adicione aqui a lógica para lidar com o clique do botão
  };

  const [selectedServices, setSelectedServices] = useState<Item[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Item[]>([]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orçamento</h1>
        <Button colorScheme="blackAlpha" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo orçamento
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo Cliente</ModalHeader>
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
        data={tableData}
        onButtonClick={handleButtonClick}
      />
      {/* table */}
    </div>
  );
}
