// Em ClientForm.jsx

import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

interface IFormInput {
  name: string
  phone: number
  cep: number
  tel: number
  rua: string
  bairro: string
  cidade: string
  number: string
  document: number
}

interface ClientFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, loading }) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="items-center text-start gap-2 w-auto">
        <Label htmlFor="name">Nome</Label>
        <Input {...register("name")} className="col-span-3" type="text" placeholder="Nome" id="name" />
      </div>
      <div className="items-center text-start gap-2">
        <Label htmlFor="document">Documento</Label>
        <Input {...register("document")} className="col-span-3" placeholder="Documento" id="document" type="number" maxLength={14} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label htmlFor="tel">Telefone</Label>
          <Input {...register("tel")} className="col-span-3" placeholder="Telefone" type="number" id="tel" />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="cep">CEP</Label>
          <Input {...register("cep")} type="number" placeholder="CEP" className="col-span-3" id="cep" />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="number">Número</Label>
          <Input {...register("number")} className="col-span-3" placeholder="Número" type="number" id="number" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="items-center text-start gap-2">
          <Label htmlFor="rua">Rua</Label>
          <Input {...register("rua")} className="col-span-3" placeholder="Rua" type="text" id="rua" />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input {...register("bairro")} className="col-span-3" placeholder="Bairro" type="text" id="bairro" />
        </div>
        <div className="items-center text-start gap-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input {...register("cidade")} className="col-span-3" placeholder="Cidade" type="text" id="cidade" />
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          </DialogClose>
          <Button disabled={loading} type="submit">{loading ? "Carregando..." : "Salvar" }</Button>
        </DialogFooter>
    </form>
  );
};
