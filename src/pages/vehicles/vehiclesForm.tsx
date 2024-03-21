import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
//components
import { useAxios } from "@/hooks/useAxios";
import { Payment } from "../clients/columns";
import { Label } from "@/components/label/label";
import { Button, Input, ModalFooter, Select } from "@chakra-ui/react";

interface IFormInput {
  name: string;
  plate: string;
  color: string;
  year: number;
  city: string;
  clientId: number;
}

interface ClientFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean;
  onClose: () => void;
}

interface Client {
  id: string;
  name: string;
}

export const VehiclesForm: React.FC<ClientFormProps> = ({
  onSubmit,
  loading,
  onClose,
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
        <div className="items-center text-start gap-2 pt-2">
          <Label label="Responsável pelo veículo" />
          <Select {...register("clientId")} placeholder="Clientes">
            {clients &&
              clients.map((client) => {
                return (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                );
              })}
          </Select>
        </div>

        <div className="items-center text-start gap-2 w-auto">
          <Label label="Veículo / Modelo" />
          <Input
            {...register("name")}
            className="col-span-3 mt-2"
            type="text"
            placeholder="Veículo"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label label="Cor" />
          <Input
            {...register("color")}
            className="col-span-3"
            placeholder="Cor"
            type="text"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="Ano" />
          <Input
            {...register("year")}
            type="number"
            placeholder="Ano"
            className="col-span-3"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="Placa" />
          <Input
            {...register("plate")}
            className="col-span-3"
            placeholder="Placa"
            type="text"
          />
        </div>
      </div>
      <div className="items-center text-start gap-2">
        <Label label="Cidade" />
        <Input
          {...register("city")}
          className="col-span-3"
          placeholder="Cidade"
          type="text"
        />
      </div>
      <ModalFooter>
        <Button colorScheme="gray" mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button
          isLoading={loading}
          type="submit"
          colorScheme="whatsapp"
          variant="solid"
        >
          Salvar
        </Button>
      </ModalFooter>
    </form>
  );
};
