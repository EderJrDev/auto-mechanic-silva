export function NotFound() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex text-white items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-[#0F3DA2] font-dark font-extrabold mb-8">
            {" "}
            404
          </div>
          <p className="text-2xl md:text-3xl text-black font-light leading-normal mb-8">
            Desculpe, não conseguimos encontrar a página que você está
            procurando
          </p>

          <a
            href="/"
            className="bg-[#0F3DA2] w-[200px] rounded-md font-medium mt-6 mx-auto px-6 py-3"
          >
            Voltar ao Menu Principal
          </a>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            className="animate-bounce animate-infinite animate-ease-in-out animate-delay-300"
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
}
