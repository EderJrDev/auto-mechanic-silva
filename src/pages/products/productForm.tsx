import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
//components
import { Label } from "@/components/label/label";
import { Button, Input, ModalFooter, Textarea } from "@chakra-ui/react";

interface IFormInput {
  name: string;
  price: string;
  brand: string;
  code: string;
}

interface ProductFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  loading,
  onClose,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label label="Código" />
          <Input
            {...register("code")}
            className="col-span-3"
            type="text"
            placeholder="Código"
          />
        </div>
        <div className="items-center text-start gap-2 w-auto">
          <Label label="Marca" />
          <Input
            {...register("brand")}
            className="col-span-3"
            type="text"
            placeholder="Código"
          />
        </div>
      </div>
      <div className="items-center text-start gap-2 w-auto">
        <Label label="Valor R$" />
        <Input
          {...register("price")}
          className="col-span-3"
          placeholder="Valor"
          type="number"
        />
      </div>
      <div className="gap-4">
        <div className="items-center text-start gap-2">
          <Label label="Nome do produto" />
          <Textarea
            {...register("name")}
            className="col-span-3"
            placeholder="Nome do produto"
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
