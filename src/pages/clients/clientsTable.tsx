import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ClientsTable: React.FC = () => {
  return (
    <div className="border rounded-lg p-2 bg-slate-300">
      <Table className="">
        <TableHeader>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead>Endereço</TableHead>
        </TableHeader>
        <TableBody>
         
        {Array.from({ length: 10 }).map((_, i) => {
               return (
                 <TableRow key={i}>
                   <TableCell>Danilo</TableCell>
                   <TableCell>16 99322-2234</TableCell>
                   <TableCell>Rua Jerônimo Rodrigues Guerra, 730</TableCell>
                   <TableCell>445.433.332-22</TableCell>
                 </TableRow>
               );
             })}
        </TableBody>
      </Table>
    </div>
  );
};