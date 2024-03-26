import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export interface Client {
  id: string;
  name: string;
  code: string;
}

interface Service {
  id: string;
  description: string;
  code: string;
}

interface Product {
  id: string;
  name: string;
  code: string;
}

interface BudgetItem {
  budgetId: number;
  id: number;
  product?: string;
  productsId?: number;
  quantity: number;
  service: Service[];
  servicesId: number;
}

export interface PropsBudget {
  id: string;
  clientId: string;
  totalValue: number;
  budgetItems: BudgetItem[];
}

type FetchFunction<T> = () => Promise<T[]>;

function useFetch() {
  const { fetchData } = useAxios();

  const fetchClients: FetchFunction<Client> = async () => {
    const clients = await fetchData({
      url: "client",
      method: "get",
    });
    return clients.data;
  };

  const fetchProducts: FetchFunction<Product> = async () => {
    const products = await fetchData({
      url: "product",
      method: "get",
    });
    return products.data;
  };

  const fetchServices: FetchFunction<Service> = async () => {
    const services = await fetchData({
      url: "service",
      method: "get",
    });
    return services.data;
  };

  async function fetchBudgets() {
    const budgets = await fetchData({
      url: "budget",
      method: "get",
    });
    return budgets.data;
  }

  const { data: clients } = useQuery<Client[], Error>({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { data: products } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: services } = useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { data: budgets } = useQuery<[]>({
    queryKey: ["budgets"],
    queryFn: fetchBudgets,
  });

  return { clients, products, services, budgets };
}

export default useFetch;
