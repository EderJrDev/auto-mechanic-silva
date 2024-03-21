interface ColumnDef<TData> {
  header: string;
  accessor: keyof TData;
}

export type Payment = {
  id: number;
  name: string;
  price: number;
  brand: string;
  code: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessor: "id",
    header: "Id",
  },
  {
    accessor: "code",
    header: "Código",
  },
  {
    accessor: "name",
    header: "Nome",
  },
  {
    accessor: "price",
    header: "Preço",
  },
  {
    accessor: "brand",
    header: "Marca",
  },
];
