import { PropsClient } from "../clients/columns";
import { PropsService } from "../services/colums";

interface ColumnDef<TData> {
  header?: string;
  accessor?: keyof TData | string;
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
  totalValue: number;
  budgetItems: BudgetItem[];
  client: PropsClient;
  clientId: number;
  clientName: string;
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
    accessor: "clientName",
    header: "Cliente",
  },
  {
    isButton: true,
  },
];
