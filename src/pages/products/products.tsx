import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
//components
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

import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { useAxios } from "@/hooks/useAxios";
import { Payment, columns } from "./columns";
import { ProductForm } from "./productForm";

interface IFormInput {
  name: string;
  price: string;
  brand: string;
  code: string;
}

export function Products() {
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataTable, setDataTable] = useState<Payment[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    data.price = parseInt(data.price);
    const response = await fetchData({
      url: "product",
      method: "post",
      data: data,
    });

    if (response.status === 201) {
      toast.success("Produto adicionado com sucesso!");
      onClose();
      setDataTable([...dataTable, response]);
    } else {
      toast.error("Falha ao cadastrar produto.");
    }
  };

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      const response = await fetchData({
        url: "product",
        method: "get",
      });

      setDataTable(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos / Peças</h1>

        <Button colorScheme="blackAlpha" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Produto
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo Produto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ProductForm
                onSubmit={onSubmit}
                loading={loading}
                onClose={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* table */}
      <DataTable columns={columns} data={dataTable} />
      {/* table */}
    </div>
  );
}
