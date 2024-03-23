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

import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { useAxios } from "@/hooks/useAxios";

import { ClientForm } from "./clientForm";
import { Payment, columns } from "./columns";

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

export function CLients() {
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tableData, setTableData] = useState<Payment[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const address = `${data.cep}, ${data.rua}, ${data.bairro}, ${data.number}, ${data.cidade}`;

    const response = await fetchData({
      url: "client",
      method: "post",
      data: {
        name: data.name,
        document: data.document,
        phone: data.tel,
        address: address,
      },
    });

    if (response.status === 201) {
      toast.success("Cliente criado com sucesso!");
      setTableData([...tableData, response.data]);
      onClose();
    } else {
      toast.error("Falha ao cadastrar cliente.");
    }
  };

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      const response = await fetchData({
        url: "client",
        method: "get",
      });

      setTableData(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

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
      <DataTable columns={columns} data={tableData} />
      {/* table */}
    </div>
  );
}
