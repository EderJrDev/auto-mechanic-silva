interface ColumnDef<TData> {
  header?: string;
  accessor?: keyof TData; // Torna a propriedade opcional
  isButton?: boolean;
}

export type Payment = {
  id: number;
  totalValue: number;
  clientId: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessor: "id",
    header: "ID",
  },
  {
    accessor: "totalValue",
    header: "Valor total",
  },
  {
    accessor: "clientId",
    header: "Cliente",
  },
  {
    isButton: true,
  },
];
