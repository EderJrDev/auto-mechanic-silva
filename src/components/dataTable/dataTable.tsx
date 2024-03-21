import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

interface ColumnDef<TData, TValue> {
  header: string;
  accessor: keyof TData;
  isButton?: boolean; // Nova propriedade para determinar se é um botão
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onButtonClick?: (id: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onButtonClick,
}: DataTableProps<TData, TValue>) {
  const handleButtonClick = (id: number) => {
    onButtonClick(id);
  };

  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
            {columns.some((column) => column.isButton) && <Th>Action</Th>}{" "}
            {/* Renderiza a coluna do botão apenas se houver uma coluna com isButton definido como true */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>{item[column.accessor]}</Td>
              ))}
              {columns.some((column) => column.isButton) && ( // Renderiza o botão apenas se houver uma coluna com isButton definido como true
                <Td>
                  {columns.map((column, colIndex) =>
                    column.isButton ? (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        key={colIndex}
                        onClick={() => handleButtonClick(item.id)}
                      >
                        Clique
                      </Button>
                    ) : null
                  )}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
