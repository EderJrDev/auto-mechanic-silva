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
import { Payment, columns } from "./columns";
import { VehiclesForm } from "./vehiclesForm";

interface IFormInput {
  code: string;
  description: string;
  value: number;
}

export function Vehicles() {
  const { loading, fetchData } = useAxios();

  const [data, setData] = useState<Payment[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetchData({
      url: "vehicles",
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
        url: "vehicle",
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
        <h1 className="text-3xl font-bold">Veículos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Novo Veículo
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo veículo</DialogTitle>
              <DialogDescription>Cadastre um novo veículo</DialogDescription>
            </DialogHeader>

            <VehiclesForm onSubmit={onSubmit} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
      {/* table */}
      <DataTable columns={columns} data={data} />
      {/* table */}
    </div>
  );
}
