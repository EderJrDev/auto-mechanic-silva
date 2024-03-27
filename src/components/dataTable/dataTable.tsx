import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { Download } from "phosphor-react";
import { ReactNode } from "react";

interface ColumnDef<TData> {
  header?: string;
  accessor?: keyof TData;
  isButton?: boolean;
}

interface DataTableProps<TData, TItem> {
  columns: ColumnDef<TItem>[];
  data?: TData[];
  onButtonClick?: (id: number) => void;
}

export function DataTable<TData, TItem extends Record<string, any>>({
  columns,
  data,
  onButtonClick,
}: DataTableProps<TData, TItem>) {
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
            {columns.some((column) => column.isButton) && <Th>Download</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>
                  {item[column.accessor as keyof TData] as ReactNode}
                </Td>
              ))}
              {columns.some((column) => column.isButton) && (
                <Td className="items-center">
                  {columns.map((column, colIndex) =>
                    column.isButton ? (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        key={colIndex}
                        onClick={() => {
                          if (
                            typeof item === "object" &&
                            item !== null &&
                            "id" in item &&
                            typeof item.id === "number"
                          ) {
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
