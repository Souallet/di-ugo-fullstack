import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import CustomersTable from "../components/customers-table";

interface CustomersPageProps {}

const CustomersPage: React.FC<CustomersPageProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des clients</CardTitle>
        <CardDescription>
          Ensemble des clients importés depuis les fichiers CSV
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomersTable />
      </CardContent>
    </Card>
  );
};

export default CustomersPage;
