import { PropsService } from "../services/colums";

interface ColumnDef<TData> {
  header?: string;
  accessor?: keyof TData; // Torna a propriedade opcional
  isButton?: boolean;
}

interface BudgetItem {
  budgetId: number;
  id: number;
  product?: string;
  productsId?: number;
  quantity: number;
  service: PropsService[];
  servicesId: number;
}

export interface PropsBudget {
  id: string;
  clientId: string;
  totalValue: number;
  budgetItems: BudgetItem[];
}

export const columns: ColumnDef<PropsBudget>[] = [
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
