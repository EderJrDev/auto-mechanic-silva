import { useState, useEffect } from "react";
import axios from "axios";

interface FetchDataOptions {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  data?: any;
  params?: any;
}

interface UseAxiosResponse {
  error: string;
  loading: boolean;
  fetchData: (options: FetchDataOptions) => Promise<any>; // Adjust return type to Promise<any>
}

export function useAxios(): UseAxiosResponse {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    httpAgent: false,
    baseURL: "https://oficina-backend.vercel.app/",
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      source.cancel("Componente desmontado: Requisição cancelada.");
    };
  }, []);

  const fetchData = async ({ url, method, data }: FetchDataOptions) => {
    setLoading(true);
    console.log(data);
    try {
      const result = await axiosInstance({
        url,
        method,
        data: method.toLowerCase() === "get" ? undefined : data,
        params: method.toLowerCase() === "get" ? data : undefined,
        cancelToken: axios.CancelToken.source().token,
      });

      console.log(result);
      // setResponse(result);
      return result;
    } catch (error) {
      console.log(error);
      console.log(error.request.response);
      if (
        error.request.response.includes("Failed to login") ||
        error.request.response.includes("User with email  not found")
      ) {
        setError("Usuário ou senha inválidos.");
      }
      if (axios.isCancel(error)) {
        console.log("Requisição cancelada", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, fetchData };
}
