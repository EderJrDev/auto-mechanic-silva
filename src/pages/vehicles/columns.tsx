interface ColumnDef<TData, TValue> {
  header: string;
  accessor: keyof TData;
}

export type Payment = {
  name: string;
  plate: string;
  color: string;
  year: number;
  city: string;
  clientId: any;
};

export const columns: ColumnDef<Payment, any>[] = [
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
