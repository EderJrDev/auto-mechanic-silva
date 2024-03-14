import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
//components
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
import { Payment, columns } from "./colums";
import { ServicesForm } from "./servicesForm";

interface IFormInput {
  code: string;
  description: string;
  value: number;
}

export function Services() {
  const { loading, fetchData } = useAxios();

  const [data, setData] = useState<Payment[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetchData({
      url: "service",
      method: "post",
      data: { data },
    });

    console.log(response);

    setData([...data, response]);

    if (response.status === 201) {
      toast.success("Serviço criado com sucesso!");
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

      setData(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Serviços</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Novo Serviço
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Serviço</DialogTitle>
              <DialogDescription>Cadastre um novo serviço</DialogDescription>
            </DialogHeader>

            <ServicesForm onSubmit={onSubmit} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
      {/* table */}
      <DataTable columns={columns} data={data} />
      {/* table */}
    </div>
  );
}
