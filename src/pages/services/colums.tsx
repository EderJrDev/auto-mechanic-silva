import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  code: string;
  description: string;
  value: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "description",
    header: "Descrição do serviço",
  },
  {
    accessorKey: "value",
    header: "Valor R$",
  },
];
