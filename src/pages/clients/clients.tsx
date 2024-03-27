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

import { useAxios } from "@/hooks/useAxios";
import useFetch from "@/hooks/useFetch";

import { PropsClient, columns } from "./columns";
import { ClientForm } from "./clientForm";

interface IFormInput {
  name: string;
  phone: number;
  cep: number;
  tel: number;
  rua: string;
  bairro: string;
  cidade: string;
  number: string;
  document: number;
}

interface ClientObject {
  name: string;
  document: number;
  phone: number;
  address: string;
}

export function CLients() {
  const { clients } = useFetch();
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const sendClient = (obj: IFormInput) =>
    fetchData({
      url: "client",
      method: "post",
      data: obj,
    });

  const { mutateAsync: sendClientFn } = useMutation({
    mutationFn: sendClient,
    onSuccess(response) {
      queryClient.setQueryData<PropsClient[]>(["clients"], (data) => {
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
    const address = `${data.cep}, ${data.rua}, ${data.bairro}, ${data.number}, ${data.cidade}`;

    const obj: ClientObject = {
      name: data.name,
      document: data.document,
      phone: data.tel,
      address: address,
    };

    const response = await sendClientFn(obj);

    if (response.status === 201) {
      toast.success("Cliente criado com sucesso!");
      onClose();
    } else {
      toast.error("Falha ao cadastrar cliente.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button colorScheme="facebook" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Cliente
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo Cliente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ClientForm
                onSubmit={onSubmit}
                loading={loading}
                onClose={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* table */}
      <DataTable columns={columns} data={clients} />
      {/* table */}
    </div>
  );
}
