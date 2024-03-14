import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
//components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface IFormInput {
  code: number;
  description: string;
  value: number;
}

interface ClientFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean;
}

export const ServicesForm: React.FC<ClientFormProps> = ({
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="name">Código</Label>
          <Input
            {...register("code")}
            className="col-span-3"
            type="text"
            placeholder="Código"
            id="name"
          />
        </div>
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="tel">Valor</Label>
          <Input
            {...register("value")}
            className="col-span-3"
            placeholder="Valor"
            type="number"
            id="tel"
          />
        </div>
      </div>
      <div className="gap-4">
        <div className="items-center text-start gap-2">
          <Label htmlFor="document">Descrição</Label>
          <Textarea
            id="document"
            {...register("description")}
            className="col-span-3"
            placeholder="Descreva o novo serviço."
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
