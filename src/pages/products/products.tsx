import { SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
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

import useFetch from "@/hooks/useFetch";
import { useAxios } from "@/hooks/useAxios";

import { ProductForm } from "./productForm";
import { PropsProduct, columns } from "./columns";

interface IFormInput {
  name: string;
  value: number;
  brand: string;
  code: string;
}

export function Products() {
  const { products } = useFetch();
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(products)

  const queryClient = useQueryClient();

  const sendProduct = (obj: IFormInput) =>
    fetchData({
      url: "product",
      method: "post",
      data: obj,
    });

  const { mutateAsync: sendProductFn } = useMutation({
    mutationFn: sendProduct,
    onSuccess(response) {
      queryClient.setQueryData<PropsProduct[]>(["products"], (data) => {
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

    data.value = parseInt(data.value)

    const response = await sendProductFn(data);

    console.log(response.data);

    if (response.status === 201) {
      toast.success("Produto adicionado com sucesso!");
      onClose();
    } else {
      toast.error("Falha ao cadastrar produto.");
    }
  };

  console.log(products);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos / Peças</h1>

        <Button colorScheme="facebook" onClick={onOpen}>
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
      <DataTable columns={columns} data={products} />
      {/* table */}
    </div>
  );
}
