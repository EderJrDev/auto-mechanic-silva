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
  setIsModalOpen: any;
}

interface Client {
  id: string;
  name: string;
}

export const VehiclesForm: React.FC<ClientFormProps> = ({
  onSubmit,
  setIsModalOpen,
  loading,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>();

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
        <div className="items-center text-start gap-2 pt-2">
          <Label htmlFor="name">Responsável pelo veículo</Label>
          <Select
            onValueChange={(e) => {
              setValue("clientId", e);
            }}
            value={watch("clientId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Responsável pelo veículo" />
            </SelectTrigger>

            <SelectContent>
              {clients &&
                clients.map((client) => (
                  <SelectItem key={client.id} value={client.name}>
                    {client.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* </form> */}
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="name">Veículo / Modelo</Label>
          <Input
            {...register("name")}
            className="col-span-3 mt-2"
            type="text"
            placeholder="Veículo"
            id="name"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="tel">Cor</Label>
          <Input
            {...register("color")}
            className="col-span-3"
            placeholder="Cor"
            type="text"
            id="color"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="year">Ano</Label>
          <Input
            {...register("year")}
            type="number"
            placeholder="Ano"
            className="col-span-3"
            id="year"
          />
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
      </div>
      <div className="items-center text-start gap-2">
        <Label htmlFor="number">Cidade</Label>
        <Input
          {...register("city")}
          className="col-span-3"
          placeholder="Cidade"
          id="city"
          type="text"
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            onClick={() => setIsModalOpen(true)}
            type="button"
            variant="outline"
          >
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
