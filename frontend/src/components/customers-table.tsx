import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { SquareArrowOutUpRight } from "lucide-react";
import type { Customer } from "@/types/customer";
import { Link } from "react-router-dom";
import Loader from "../components/loader";
import config from "../config/site";

interface CustomersTableProps {}

const CustomersTable: React.FC<CustomersTableProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.apiUrl}/customers`)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Identifiant</TableHead>
          <TableHead>Civilité</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Code postal</TableHead>
          <TableHead>Ville</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers &&
          customers?.map((c: Customer, i: number) => (
            <TableRow>
              <TableCell className="font-medium">{c.id}</TableCell>
              <TableCell className="hidden md:table-cell">{c.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {c.lastname}
              </TableCell>
              <TableCell>{c.firstname}</TableCell>
              <TableCell className="hidden md:table-cell">
                {c.postal_code}
              </TableCell>
              <TableCell className="hidden md:table-cell">{c.city}</TableCell>
              <TableCell className="hidden md:table-cell">{c.email}</TableCell>
              <TableCell>
                <Button aria-haspopup="true" asChild>
                  <Link to={`/customers/${c.id}`}>
                    Show orders
                    <SquareArrowOutUpRight className="ml-4 h-4 w-4" />
                    <span className="sr-only">Consulter les commandes</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CustomersTable;
