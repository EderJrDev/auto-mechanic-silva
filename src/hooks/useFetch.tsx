import { useAxios } from "./useAxios";
import { useQuery } from "@tanstack/react-query";

import { PropsClient } from "@/pages/clients/columns";
import { PropsService } from "@/pages/services/colums";
import { PropsProduct } from "@/pages/products/columns";
import { PropsVehicle } from "@/pages/vehicles/columns";
import { PropsBudget } from "@/pages/budget/columns";

type FetchFunction<T> = () => Promise<T[]>;

function useFetch() {
  const { fetchData } = useAxios();

  const fetchClients: FetchFunction<PropsClient> = async () => {
    const clients = await fetchData({
      url: "client",
      method: "get",
    });
    return clients.data;
  };

  const fetchProducts: FetchFunction<PropsProduct> = async () => {
    const products = await fetchData({
      url: "product",
      method: "get",
    });
    return products.data;
  };

  const fetchServices: FetchFunction<PropsService> = async () => {
    const services = await fetchData({
      url: "service",
      method: "get",
    });
    return services.data;
  };

  const fetchVehicle: FetchFunction<PropsVehicle> = async () => {
    const vehicle = await fetchData({
      url: "vehicle",
      method: "get",
    });
    return vehicle.data;
  };

  const fetchBudgets: FetchFunction<PropsBudget> = async () => {
    const budgets = await fetchData({
      url: "budget",
      method: "get",
    });
    return budgets.data;
  };

  const { data: clients = [] } = useQuery<PropsClient[], Error>({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const { data: products = [] } = useQuery<PropsProduct[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: services = [] } = useQuery<PropsService[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { data: vehicles = [] } = useQuery<PropsVehicle[], Error>({
    queryKey: ["vehicles"],
    queryFn: fetchVehicle,
  });

  const { data: budgets = [] } = useQuery<PropsBudget[], Error>({
    queryKey: ["budgets"],
    queryFn: fetchBudgets,
  });

  return { clients, products, services, budgets, vehicles };
}

export default useFetch;
