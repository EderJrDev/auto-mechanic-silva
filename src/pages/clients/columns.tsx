interface ColumnDef<TData, TValue> {
  header: string;
  accessor: keyof TData;
}

export type Payment = {
  id: string;
  name: string;
  phone: null;
  document: number;
  address: string;
};

export const columns: ColumnDef<Payment>[] = [
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
