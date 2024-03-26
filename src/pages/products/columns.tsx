interface ColumnDef<TData> {
  header: string;
  accessor: keyof TData;
}

export type PropsProduct = {
  id: number;
  name: string;
  price: string;
  brand: string;
  code: string;
};

export const columns: ColumnDef<PropsProduct>[] = [
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
