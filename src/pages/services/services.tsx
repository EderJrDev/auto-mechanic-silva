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
import { Payment, columns } from "./colums";
import { ServicesForm } from "./servicesForm";

interface IFormInput {
  code: string;
  description: string;
  value: number;
}

export function Services() {
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataTable, setDataTable] = useState<Payment[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    data.value = parseInt(data.value);
    const response = await fetchData({
      url: "service",
      method: "post",
      data: data,
    });

    if (response.status === 201) {
      toast.success("Serviço criado com sucesso!");
      onClose();
      setDataTable([...dataTable, response]);
    } else {
      toast.error("Falha ao cadastrar serviço.");
    }
  };

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      const response = await fetchData({
        url: "service",
        method: "get",
      });

      setDataTable(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

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
      <DataTable columns={columns} data={dataTable} />
      {/* table */}
    </div>
  );
}
