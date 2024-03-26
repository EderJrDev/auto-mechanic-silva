interface ColumnDef<TData> {
  header: string;
  accessor: keyof TData;
}

export type PropsService = {
  code: string;
  description: string;
  value: number;
};

export const columns: ColumnDef<PropsService>[] = [
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
