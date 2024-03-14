import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
//components
import { Input } from "@/components/ui/input";
// hooks
import { useAxios } from "@/hooks/useAxios";
import { useAuth } from "@/hooks/authContext";

export function Login() {
  const navigate = useNavigate();

  const { setIsRegistered } = useAuth();
  const { loading, fetchData } = useAxios();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await fetchData({
      url: "user/login",
      method: "post",
      data: {
        email: email,
        password: password,
      },
    });
  
      if(result.status === 201) {
        setIsRegistered(true);
        navigate("/budget");
        setEmail("");
        setPassword("");
      } else {
        toast.error('Usuário ou senha inválidos.')
        setErrorMessage("Usuário ou senha inválidos.");
        setEmail("");
        setPassword("");
      }
  }

  return (
    <div>
      <div className="w-full flex flex-col mb-2">
        <h3 className="text-3xl font-semibold mb-2">Bem Vindo de Volta! </h3>
        <p className="text-base mb-2">Informe seus dados de login.</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="w-full flex flex-col mb-2">
          <Input
            autoFocus
            required
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full text-black py-4 my-2 border-none focus:border-none border-black outline-none focus:outline-none"
          />
          <Input
            placeholder="Senha"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black py-4 my-2 border-none focus:border-none border-black outline-none focus:outline-none"
          />
        </div>
        {errorMessage && (
          <h3 className="text-sm text-red-600 font-semibold mb-2">{errorMessage} </h3>
        )}
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center">
            <input type="checkbox" className="w-4 h-4 mr-2" />
            <p className="text-sm">Lembre de Mim </p>
          </div>
          <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
            Esqueci a Senha
          </p>
        </div>

        <div className="w-full flex flex-col my-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full text-white mt-2 font-semibold bg-[#0F3DA2] border-boxdark-2 rounded-md p-4 text-center justify-center"
          >
            {loading ? <p>Carregando...</p> : <p>Entrar</p>}
          </button>

          <button
            onClick={() => setIsRegistered(false)}
            className="w-full text-black font-semibold bg-white mt-3 border-2 border-black rounded-md p-4 text-center justify-center"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
