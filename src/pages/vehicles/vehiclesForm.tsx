import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
//components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { Payment } from "../clients/columns";

interface IFormInput {
  name: string;
  plate: string;
  color: string;
  year: number;
  city: string;
  clientId: any;
}

interface ClientFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean;
}

interface Client {
  id: string;
  name: string;
}

export const VehiclesForm: React.FC<ClientFormProps> = ({
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const [clients, setClients] = useState<Client[]>([]);

  const { fetchData } = useAxios();

  useEffect(() => {
    async function getData(): Promise<Payment[]> {
      const response = await fetchData({
        url: "client",
        method: "get",
      });

      setClients(response?.data || []);
      return response.data;
    }

    getData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="name">Responsável pelo veículo</Label>
          <Select {...register("clientId")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {clients &&
                  clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="name">Veículo / Modelo</Label>
          <Input
            {...register("name")}
            className="col-span-3"
            type="text"
            placeholder="Veículo"
            id="name"
          />
        </div>
      </div>
      <div className="items-center text-start gap-2">
        <Label htmlFor="document">Placa</Label>
        <Input
          {...register("plate")}
          className="col-span-3"
          placeholder="Placa"
          id="plate"
          type="text"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="tel">Cor</Label>
          <Input
            {...register("color")}
            className="col-span-3"
            placeholder="Cor"
            type="text"
            id="tel"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="cep">Ano</Label>
          <Input
            {...register("year")}
            type="number"
            placeholder="Ano"
            className="col-span-3"
            id="cep"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="number">Cidade</Label>
          <Input
            {...register("city")}
            className="col-span-3"
            placeholder="Número"
            type="number"
            id="number"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2">
          <Label htmlFor="rua">Rua</Label>
          <Input
            {...register("rua")}
            className="col-span-3"
            placeholder="Rua"
            type="text"
            id="rua"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            {...register("bairro")}
            className="col-span-3"
            placeholder="Bairro"
            type="text"
            id="bairro"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            {...register("cidade")}
            className="col-span-3"
            placeholder="Cidade"
            type="text"
            id="cidade"
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button disabled={loading} type="submit">
          {loading ? "Carregando..." : "Salvar"}
        </Button>
      </DialogFooter>
    </form>
  );
};
