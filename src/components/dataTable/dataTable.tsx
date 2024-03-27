import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { Download } from "phosphor-react";

interface ColumnDef<TData> {
  header?: string;
  accessor?: keyof TData;
  isButton?: boolean;
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data?: TData[];
  onButtonClick?: (id: number) => void;
}

interface DataTableItem {
  id: number;
}

export function DataTable<TData extends DataTableItem>({
  columns,
  data,
  onButtonClick,
}: DataTableProps<TData>) {
  const handleButtonClick = (id: number) => {
    if (onButtonClick) {
      onButtonClick(id);
    }
  };

  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
            {columns.some((column) => column.isButton) && <Th>Download</Th>}{" "}
            {/* Renderiza a coluna do botão apenas se houver uma coluna com isButton definido como true */}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>{item[column.accessor]}</Td>
              ))}
              {columns.some((column) => column.isButton) && ( // Renderiza o botão apenas se houver uma coluna com isButton definido como true
                <Td className="items-center">
                  {columns.map((column, colIndex) =>
                    column.isButton ? (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        key={colIndex}
                        onClick={() => {
                          if (item && item.id) {
                            handleButtonClick(item.id);
                          }
                        }}
                      >
                        <Download size={24} />
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
