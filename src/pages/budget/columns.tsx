interface ColumnDef<TData> {
  header: string;
  accessor: keyof TData; // Torna a propriedade opcional
  isButton?: boolean
}

export type Payment = {
  id: number;
  name: string;
  totalValue: number;
  clientId: number;
  action: any;
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
    accessor: "action", // Você pode definir um valor vazio para a propriedade accessor, pois não precisará dela para o botão
    header: "Ação",
    isButton: true, // Define isButton como true para exibir o botão nesta coluna
  },
  
];
