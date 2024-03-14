import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  name: string;
  phone: null;
  document: number;
  address: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "document",
    header: "Documento",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
];
