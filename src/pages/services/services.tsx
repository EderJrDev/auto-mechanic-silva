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
import { PropsService, columns } from "./colums";
import { ServicesForm } from "./servicesForm";
import useFetch from "@/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IFormInput {
  code: string;
  description: string;
  value: any;
}

export function Services() {
  const { services } = useFetch();
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const sendService = (data: IFormInput) =>
    fetchData({
      url: "service",
      method: "post",
      data: data,
    });

  const { mutateAsync: sendServiceFn } = useMutation({
    mutationFn: sendService,
    onSuccess(response) {
      queryClient.setQueryData<PropsService[]>(["services"], (data) => {
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
    data.value = parseInt(data.value);

    const response = await sendServiceFn(data);

    if (response.status === 201) {
      toast.success("Serviço criado com sucesso!");
      onClose();
    } else {
      toast.error("Falha ao cadastrar serviço.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Serviços</h1>

        <Button colorScheme="facebook" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Serviço
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo Serviço</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ServicesForm
                onSubmit={onSubmit}
                loading={loading}
                onClose={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* table */}
      <DataTable columns={columns} data={services} />
      {/* table */}
    </div>
  );
}
