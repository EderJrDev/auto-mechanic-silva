interface ColumnDef<TData> {
  header: string;
  accessor: keyof TData;
}

export type PropsVehicle = {
  id: number;
  name: string;
  plate: string;
  color: string;
  year: string;
  city: string;
  clientId: number;
};

export const columns: ColumnDef<PropsVehicle>[] = [
  {
    accessor: "clientId",
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
