interface ColumnDef<TData, TValue> {
  header: string;
  accessor: keyof TData;
}

export type Payment = {
  code: string;
  description: string;
  value: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessor: "code",
    header: "Código",
  },
  {
    accessor: "description",
    header: "Descrição do serviço",
  },
  {
    accessor: "value",
    header: "Valor R$",
  },
];
