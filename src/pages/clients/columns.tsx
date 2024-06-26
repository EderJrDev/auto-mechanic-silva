import { PropsVehicle } from "../vehicles/columns";

interface ColumnDef<TData> {
  header: string;
  accessor?: keyof TData;
}

export type PropsClient = {
  id: string;
  name: string;
  phone: null;
  document: number;
  address: string;
  vehicles: PropsVehicle[];
};

export const columns: ColumnDef<PropsClient>[] = [
  {
    accessor: "name",
    header: "Nome",
  },
  {
    accessor: "document",
    header: "Documento",
  },
  {
    accessor: "phone",
    header: "Telefone",
  },
  {
    accessor: "address",
    header: "Endereço",
  },
];
