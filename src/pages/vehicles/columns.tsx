import { PropsClient } from "../clients/columns";

interface ColumnDef<TData> {
  header: string;
  accessor: keyof TData | string;
}

export type PropsVehicle = {
  id: number;
  name: string;
  plate: string;
  color: string;
  year: string;
  city: string;
  client: PropsClient
  clientId: number;
  clientName: string;
};

export const columns: ColumnDef<PropsVehicle>[] = [
  {
    accessor: "clientName",
    header: "Cliente",
  },
  {
    accessor: "name",
    header: "Veículo",
  },
  {
    accessor: "plate",
    header: "Placa",
  },
  {
    accessor: "year",
    header: "Ano",
  },
  {
    accessor: "color",
    header: "Cor",
  },
  {
    accessor: "city",
    header: "Cidade",
  },
];
