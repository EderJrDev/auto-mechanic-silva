import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
//components
import { Label } from "@/components/label/label";
import { Button, Input, ModalFooter } from "@chakra-ui/react";

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

interface ClientFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean;
  onClose: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  loading,
  onClose,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="items-center text-start gap-2 w-auto">
        <Label label="Nome" />
        <Input
          {...register("name")}
          className="col-span-3"
          type="text"
          required
          placeholder="Nome"
          id="name"
        />
      </div>
      <div className="items-center text-start gap-2">
        <Label label="Documento" />
        <Input
          {...register("document")}
          className="col-span-3"
          placeholder="Documento"
          required
          id="document"
          type="number"
          maxLength={14}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label label="Telefone" />
          <Input
            {...register("tel")}
            className="col-span-3"
            required
            placeholder="Telefone"
            type="number"
            id="tel"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="CEP" />
          <Input
            {...register("cep")}
            required
            type="number"
            placeholder="CEP"
            className="col-span-3"
            id="cep"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="Número" />
          <Input
            {...register("number")}
            required
            className="col-span-3"
            placeholder="Número"
            type="number"
            id="number"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2">
          <Label label="Rua" />
          <Input
            {...register("rua")}
            className="col-span-3"
            placeholder="Rua"
            type="text"
            id="rua"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="Bairro" />
          <Input
            {...register("bairro")}
            className="col-span-3"
            placeholder="Bairro"
            type="text"
            id="bairro"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="Cidade" />
          <Input
            {...register("cidade")}
            required
            className="col-span-3"
            placeholder="Cidade"
            type="text"
            id="cidade"
          />
        </div>
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
