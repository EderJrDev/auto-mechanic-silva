import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface ColumnDef<TData, TValue> {
  header: string;
  accessor: keyof TData;
  // Outras propriedades das colunas, se necessário
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>{item[column.accessor]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
