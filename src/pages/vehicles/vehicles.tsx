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
} from "@chakra-ui/react";
import { DataTable } from "@/components/dataTable/dataTable";

import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { useAxios } from "@/hooks/useAxios";
import { Payment, columns } from "./columns";
import { VehiclesForm } from "./vehiclesForm";

import { Button } from "@chakra-ui/react";

interface IFormInput {
  name: string;
  plate: string;
  color: string;
  year: number;
  city: string;
  clientId: number;
}

export function Vehicles() {
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataTable, setDataTable] = useState<Payment[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!data.clientId) {
      toast.warning("Preencha todas as informações!");
      return;
    }

    // data.year = parseInt(data.year);
    // data.clientId = parseInt(data.clientId);

    const response = await fetchData({
      url: "vehicle",
      method: "post",
      data: data,
    });

    if (response.status === 201) {
      toast.success("Veículo adicionado com sucesso!");
      setDataTable([...dataTable, response.data]);
      onClose();
    } else {
      toast.error("Falha ao cadastrar serviço.");
    }
  };

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      const response = await fetchData({
        url: "vehicle",
        method: "get",
      });

      console.log(response.data);

      setDataTable(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Veículos</h1>
        <Button colorScheme="blackAlpha" onClick={onOpen}>
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
      <DataTable columns={columns} data={dataTable} />
      {/* table */}
    </div>
  );
}
