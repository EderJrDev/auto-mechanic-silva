import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  ModalFooter,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
import { Label } from "@/components/label/label";
import { PropsClient } from "../clients/columns";

interface IFormInput {
  name: string;
  clientId: string;
  price: string;
  brand: string;
  code: string;
  totalService: string;
  totalProduct: string;
}

interface Item {
  id: string;
  name?: string;
  description?: string;
}

interface BudgetFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  loading: boolean;
  onClose: () => void;
  selectedServices: Item[]; // Type as an array of Item objects
  setSelectedServices: React.Dispatch<React.SetStateAction<Item[]>>; // Function to update selectedServices
  selectedProducts: Item[]; // Type as an array of Item objects
  setSelectedProducts: React.Dispatch<React.SetStateAction<Item[]>>; // Function to update selectedProducts
}

export const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  loading,
  onClose,
  selectedServices,
  setSelectedServices,
  selectedProducts,
  setSelectedProducts,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const { clients, products, services } = useFetch();

  const handleServiceChange = (serviceId: string) => {
    console.log(serviceId);
    const selectedService = services.find(
      (service: any) => service.id?.toString() === serviceId
    );
    if (selectedService && selectedService.id) {
      console.log(selectedService.description);
      setSelectedServices([selectedService, ...selectedServices]);
    }
  };
  const handleProductChange = (productId: string) => {
    console.log(productId);
    const selectedProduct = products.find(
      (product: any) => product.id.toString() === productId
    );
    if (selectedProduct) {
      console.log(selectedProduct.name);
      setSelectedProducts([selectedProduct, ...selectedProducts]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="items-center text-start gap-2 pt-2">
          <Label label="Responsável pelo veículo" />
          <Select {...register("clientId")} placeholder="Clientes">
            {clients?.map((client: PropsClient) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="items-center text-start gap-2 w-auto">
          <Label label="Produtos" />
          <Select
            placeholder="Produtos"
            onChange={(e) => handleProductChange(e.target.value)}
          >
            {products &&
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {`${product.code} - ${product.name}`}
                </option>
              ))}
          </Select>
        </div>
      </div>
      <div className="items-center text-start gap-2 w-auto">
        <Label label="Serviços" />
        <Select
          placeholder="Serviços"
          onChange={(e) => handleServiceChange(e.target.value)}
        >
          {services &&
            services.map((service) => (
              <option key={service.id} value={service.id}>
                {`${service.code} - ${service.description}`}
              </option>
            ))}
        </Select>
      </div>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Produtos</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedProducts.map((product) => (
            <Tr key={product.name}>
              <Td>{product.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Serviços</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedServices.map((service) => (
            <Tr key={service.id}>
              <Td>{service.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <div className="grid grid-cols-2 gap-4">
        <div className="items-center text-start gap-2 w-auto">
          <Label label="Total Serviços" />
          <Input
            {...register("totalService")}
            className="col-span-3"
            required
            placeholder="R$ 0,00"
            type="number"
          />
        </div>
        <div className="items-center text-start gap-2">
          <Label label="Total Produtos" />
          <Input
            {...register("totalProduct")}
            required
            type="number"
            placeholder="R$0,00"
            className="col-span-3"
            id="cep"
          />
        </div>
      </div>

      <ModalFooter>
        <Button colorScheme="gray" mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button
          isLoading={loading}
          type="submit"
          colorScheme="whatsapp"
          variant="solid"
        >
          Salvar
        </Button>
      </ModalFooter>
    </form>
  );
};
