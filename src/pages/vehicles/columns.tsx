import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  name: string;
  plate: string;
  color: string;
  year: number;
  city: string;
  clientId: any;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "clientId",
    header: "Cliente",
  },
  {
    accessorKey: "name",
    header: "Veículo",
  },
  {
    accessorKey: "plate",
    header: "Placa",
  },
  {
    accessorKey: "year",
    header: "Ano",
  },
  {
    accessorKey: "color",
    header: "Cor",
  },
  {
    accessorKey: "city",
    header: "Cidade",
  },
];
