import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
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
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { DataTable } from "@/components/dataTable/dataTable";

import useFetch from "@/hooks/useFetch";
import { useAxios } from "@/hooks/useAxios";

import { VehiclesForm } from "./vehiclesForm";
import { PropsVehicle, columns } from "./columns";

interface IFormInput {
  name: string;
  plate: string;
  color: string;
  year: any;
  city: string;
  clientId: any;
}

export function Vehicles() {
  const { vehicles } = useFetch();
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const sendService = (obj: IFormInput) =>
    fetchData({
      url: "vehicle",
      method: "post",
      data: obj,
    });

  const { mutateAsync: sendVehiclesFn } = useMutation({
    mutationFn: sendService,
    onSuccess(response) {
      queryClient.setQueryData<PropsVehicle[]>(["vehicles"], (data) => {
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
    if (!data.clientId) {
      toast.warning("Preencha todas as informações!");
      return;
    }

    console.log(data);

    data.clientId = parseInt(data.clientId);
    data.year = parseInt(data.year);

    console.log(data);

    const response = await sendVehiclesFn(data);
    console.log(response);
    if (response.status === 201) {
      toast.success("Veículo adicionado com sucesso!");
      onClose();
    } else {
      toast.error("Falha ao cadastrar serviço.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Veículos</h1>
        <Button colorScheme="facebook" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo Veículo
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VehiclesForm
                onSubmit={onSubmit}
                loading={loading}
                onClose={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* table */}
      <DataTable columns={columns} data={vehicles} />
      {/* table */}
    </div>
  );
}
