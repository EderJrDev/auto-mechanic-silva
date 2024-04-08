import { SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { DataTable } from "@/components/dataTable/dataTable";

import useFetch from "@/hooks/useFetch";
import { useAxios } from "@/hooks/useAxios";

import { format } from "date-fns";
import { BudgetForm } from "./budgetForm";
import { PropsBudget, columns } from "./columns";

// @ts-ignore
import html2pdf from "html2pdf.js";
import ReactDOMServer from "react-dom/server";
import { useState } from "react";

interface IFormInput {
  name: string;
  clientId: string;
  vehicleId: string;
  value: string;
  brand: string;
  code: string;
  totalProduct: string;
  totalService: string;
  validate: string;
}

interface Item {
  id: string;
  name?: string;
  description?: string;
}

interface BudgetItem {
  serviceId?: number;
  productId?: number;
  quantity?: number;
}

interface BudgetObject {
  totalProduct: number;
  totalService: number;
  clientId: number;
  client: string;
  vehicleId: number;
  budgetItems: BudgetItem[];
  validate: string;
}

export function Budget() {
  const { budgets } = useFetch();
  const { loading, fetchData } = useAxios();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedServices, setSelectedServices] = useState<Item[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Item[]>([]);

  const queryClient = useQueryClient();

  const sendBudget = (obj: BudgetObject) =>
    fetchData({
      url: "budget",
      method: "post",
      data: obj,
    });

  const { mutateAsync: sendBudgetFn } = useMutation({
    mutationFn: sendBudget,
    onSuccess(response) {
      queryClient.setQueryData<PropsBudget[]>(["budgets"], (data) => {
        if (Array.isArray(data)) {
          return [...data, response.data];
        }
        return [response.data];
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    console.log(selectedServices);
    console.log(selectedProducts);

    const serviceIds = selectedServices.map((service) => service.id);
    const productIds = selectedProducts.map((product) => product.id);

    const budgetItems = [
      ...serviceIds.map((id) => ({ serviceId: parseInt(id), quantity: 1 })),
      ...productIds.map((id) => ({ productId: parseInt(id), quantity: 1 })),
    ];

    const obj: BudgetObject = {
      totalProduct: parseInt(data.totalProduct),
      totalService: parseInt(data.totalService),
      clientId: parseInt(data.clientId),
      vehicleId: parseInt(data.vehicleId),
      budgetItems: budgetItems,
      validate: data.validate,
    };

    console.log(obj);

    const response = await sendBudgetFn(obj);

    if (response.status === 201) {
      toast.success("Produto adicionado com sucesso!");
      onClose();
    } else {
      toast.error("Falha ao cadastrar produto.");
    }
  };

  const handleButtonClick = async (id: number) => {
    const loadingToast = toast.loading("Gerando orçamento...");
    try {
      const response = await fetchData({
        url: `/budget/pdf/${id}`,
        method: "get",
      });

      console.log(response);

      if (response) {
        const headerContent = (
          <div className="text-center border-t border-t-black">
            <div className="text-center text-sm my-5 block">
              <h1 className="font-bold text-2xl mb-6">AUTO MECÂNICA SILVA</h1>
              <p>RUA HIPÓLITO JOSÉ DA COSTA 3800 - JD. GUANABARA</p>
              <p>FRANCA-SP - CEP: 14405-440</p>
              <p>FONE 01699378-8214 CNPJ: 32.768.941/0001-66</p>
            </div>

            <div className="flex justify-between border-y border-t-black text-sm py-2">
              <p>
                <strong>COTAÇÃO</strong> - {response.data.numero_orcamento}
              </p>
              <p>
                <strong>VI:</strong> ÉDER SILVA CUNHA
              </p>
              <p>
                <strong>DATA:</strong>{" "}
                {format(
                  new Date(`${response.data.validate}T00:00:00`),
                  "dd-MM-yyyy"
                )}
              </p>
            </div>

            <div className="text-left text-sm my-3">
              <p className="py-2">
                <strong>Cliente:</strong> {response.data.cliente} VENDA
                CONSUMIDOR &nbsp; DEP: MATRIZ BTS - S.P.
              </p>
              <p className="py-1">
                <strong>Endereco:</strong> {response.data.endereco}&nbsp; NF:
              </p>
              <p className="py-1">
                <strong>Cidade:</strong> {response.data.cidade} &nbsp; HORA:{" "}
                {response.data.hora}
              </p>
              <p className="py-1">
                <strong>CPF/CNPJ:</strong> {response.data.documento}
              </p>
              <p className="py-1">
                <strong>FONE:</strong>
                {response.data.fone}
              </p>
            </div>

            <div className="text-left text-sm my-4">
              <p>
                <strong>VEICULO:</strong> {response.data.veiculo}&nbsp;{" "}
                <strong>PLACA:</strong> {response.data.placa} &nbsp;{" "}
                <strong>CIDADE: </strong>
                {response.data.cidade} &nbsp; <strong>CLASSE:</strong>{" "}
                {response.data.classe} &nbsp; <strong>COR: </strong>
                {response.data.cor} &nbsp; <strong>ANO:</strong>{" "}
                {response.data.ano}
              </p>
            </div>

            <div className="my-4 text-sm w-full border-t border-black">
              <table className="w-full border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">QT. ITEM</th>
                    <th className="border px-4 py-2">UNID</th>
                    <th className="border px-4 py-2">CÓDIGO</th>
                    <th className="border px-4 py-2" style={{ width: "50%" }}>
                      DESCRIÇÃO
                    </th>
                    <th className="border px-4 py-2">MARCA</th>
                    <th className="border px-4 py-2">VL. UNID</th>
                    <th className="border px-4 py-2">VL. TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {response.data.items.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.qtd}</td>
                      <td className="border px-4 py-2">PC</td>
                      <td className="border px-4 py-2">{item.codigo}</td>
                      <td
                        className="border px-4 py-2"
                        style={{ color: "rgb(73, 73, 73)" }}
                      >
                        {item.descricao}
                      </td>
                      <td
                        className="border px-4 py-2"
                        style={{ color: "rgb(73, 73, 73)" }}
                      >
                        {item.marca}
                      </td>
                      <td className="border px-4 py-2">{item.valor}</td>
                      <td className="border px-4 py-2">{item.valor_total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="border-t mt-6 pt-4">
              <div className="flex justify-between">
                <p>QTDE DE ITENS: {response.data.totalItems}</p>
                {/* <p>
                  <strong>VALIDADE:</strong> {response.data.data}
                </p> */}
              </div>

              <div className="flex justify-between my-4">
                <p>DATA DE PAGTO: ___________</p>
                <p>
                  <strong>TOTAL: {response.data.total}</strong>
                </p>
              </div>
            </footer>
          </div>
        );

        const htmlString = ReactDOMServer.renderToString(headerContent);

        const options = {
          margin: 27,
          filename: "Orçamento_Auto_Mecânica_Silva.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "pt", format: "letter", orientation: "portrait" },
        };

        const addPageNumbers = (pdf: any) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text(
              `Página ${i} de ${totalPages}`,
              pdf.internal.pageSize.getWidth() - 100,
              pdf.internal.pageSize.getHeight() - 15
            );
          }
        };

        const generatePDF = () => {
          html2pdf()
            .from(htmlString)
            .set(options)
            .toPdf()
            .get("pdf")
            .then(function (pdfDoc: any) {
              addPageNumbers(pdfDoc);
              pdfDoc.save(options.filename);
            });
        };

        generatePDF();

        toast.success("Arquivo gerado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao baixar orçamento.");
    } finally {
      toast.dismiss(loadingToast);
      onClose();
    }
  };

  console.log(budgets)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orçamento</h1>
        <Button colorScheme="facebook" onClick={onOpen}>
          {" "}
          <PlusCircle className="w-4 h-4 mr-2" /> Novo orçamento
        </Button>

        <Modal size="xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo orçamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <BudgetForm
                onSubmit={onSubmit}
                loading={loading}
                onClose={onClose}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* table */}
      <DataTable
        columns={columns}
        data={budgets}
        onButtonClick={handleButtonClick}
      />
      {/* table */}
    </div>
  );
}
