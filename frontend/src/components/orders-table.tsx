import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Order } from "@/types/order";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom client</TableHead>
          <TableHead>Identifiant</TableHead>
          <TableHead>Produit</TableHead>
          <TableHead>Quantité</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Devise</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {orders.length === 0 && (
          <TableRow className="py-8 font-bold grid items-center">
            Aucune commande disponible
          </TableRow>
        )}
        {orders.length > 0 &&
          orders.map((p: Order, i: number) => (
            <TableRow key={i}>
              <TableCell>{p.customer ? p.customer.lastname : ""}</TableCell>
              <TableCell className="font-medium">
                {p.purchaseIdentifier}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {p.productId}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {p.quantity}
              </TableCell>
              <TableCell className="hidden md:table-cell">{p.price}</TableCell>
              <TableCell className="hidden md:table-cell">
                {p.currency}
              </TableCell>
              <TableCell className="hidden md:table-cell">{p.date}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
