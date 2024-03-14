import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

  const [data, setData] = useState<Payment[]>([]);

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

    console.log(response);

    setData([...data, response]);

    if (response.status === 201) {
      toast.success("Cliente criado com sucesso!");
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

      setData(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Novo Cliente
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
              <DialogDescription>Cadastre um novo cliente</DialogDescription>
            </DialogHeader>

            <ClientForm onSubmit={onSubmit} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
      {/* table */}
      <DataTable columns={columns} data={data} />
      {/* table */}
    </div>
  );
}
