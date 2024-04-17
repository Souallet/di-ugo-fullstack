import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import type { Order } from "@/types/order";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";
import OrdersTable from "../components/orders-table";
import Loader from "../components/loader";
import config from "../config/site";

const getTotalByCurrency = (orders: Order[]) => {
  let totalByCurrency: any = {};
  orders.map((o: Order) => {
    totalByCurrency[o.currency] = totalByCurrency.hasOwnProperty(o.currency)
      ? totalByCurrency[o.currency] + o.price
      : o.price;
  });

  return totalByCurrency;
};

interface OrdersPageProps {}

const OrdersPage: React.FC<OrdersPageProps> = () => {
  let { customerId } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalByCurrency, setTotalByCurrency] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.apiUrl}/customers/${customerId}/orders`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let orders = data.data;
        setOrders(orders);
        setTotalByCurrency(getTotalByCurrency(orders));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [customerId]);

  return (
    <Card>
      <CardHeader>
        <Button
          variant="outline"
          className="h-7  pl-1 pr-3 w-fit mb-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-4" /> Retour
          <span className="sr-only">Back</span>
        </Button>
        <CardTitle>Commandes</CardTitle>
        <CardDescription>
          Commandes associées à l'utilisateur : {customerId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? <Loader /> : <OrdersTable orders={orders} />}
      </CardContent>
      {!loading && (
        <CardFooter className="flex flex-col items-start">
          <p className="font-bold">Total par devises</p>
          <ul>
            {Object.entries(totalByCurrency).map((t: any, i: number) => (
              <li key={i}>
                {t[1]}
                <span className="font-semibold ml-1">{t[0]}</span>
              </li>
            ))}
          </ul>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrdersPage;
