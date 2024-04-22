import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { Download } from "phosphor-react";
import { ReactNode, useState } from "react";
import ReactPaginate from "react-paginate";

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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Defina o número de itens por página aqui

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const paginatedData = data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil((data?.length || 1) / itemsPerPage);

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
            {columns?.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
            {columns.some((column) => column.isButton) && <Th>Download</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData?.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <Td key={colIndex}>
                  {item[column.accessor as keyof TData] as ReactNode}
                </Td>
              ))}
              {columns?.some((column) => column.isButton) && (
                <Td className="items-center">
                  {columns?.map((column, colIndex) =>
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
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próxima"}
        breakLabel={"..."}
        pageCount={pageCount}
        className="mt-3 flex justify-center"
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center"}
        activeClassName={"active"}
        previousLinkClassName={"px-3 py-1 border rounded-full border-gray-300"}
        nextLinkClassName={"px-3 py-1 border rounded-full border-gray-300"}
        breakLinkClassName={"px-3 py-1 border rounded-full border-gray-300"}
        pageLinkClassName={"px-3 py-1 border rounded-full border-gray-300"}
        previousClassName={"mx-2"}
        nextClassName={"mx-2"}
      />
    </Box>
  );
}
