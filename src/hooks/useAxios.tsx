import { useState, useEffect } from "react";
import axios from "axios";

interface FetchDataOptions {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  data?: any;
  params?: any;
}

interface UseAxiosResponse {
  loading: boolean;
  fetchData: (options: FetchDataOptions) => Promise<any>;
}

export function useAxios(): UseAxiosResponse {
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    httpAgent: false,
    baseURL: "https://oficina-backend.vercel.app/",
    // baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      source.cancel("Componente desmontado: Requisição cancelada.");
    };
  }, []);

  const fetchData = async ({ url, method, data }: FetchDataOptions) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data: method.toLowerCase() === "get" ? undefined : data,
        params: method.toLowerCase() === "get" ? data : undefined,
        cancelToken: axios.CancelToken.source().token,
      });
      return result;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData };
}
