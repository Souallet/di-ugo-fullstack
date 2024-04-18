<?php

namespace App\Command;

use App\Entity\Customer;
use App\Entity\Order;
use DateTime;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

use League\Csv\Reader;
use Doctrine\ORM\EntityManagerInterface;

#[AsCommand(
    name: 'ugo:orders:import',
    description: 'Add a short description for your command',
)]
class UgoOrdersImportCommand extends Command
{


    public function __construct(private readonly EntityManagerInterface $entityManager,)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $dataDirectory = __DIR__ . '/../../data';
        $files = [
            'customers' => "customers.csv",
            'purchases' => "purchases.csv"
        ];

        foreach ($files as $name => $filename) {
            $filePath = $dataDirectory . '/' . $filename;
            if (file_exists($filePath)) {
                // Utilisation de la classe CsvReader pour lire le fichier CSV
                $csv = Reader::createFromPath($filePath, 'r')->setDelimiter(',')->setDelimiter(';');
                $csv->setHeaderOffset(0); // Premier ligne est les en-têtes
                $records = $csv->getRecords(); // Récupérer les enregistrements

                // Traiter les enregistrements
                foreach ($records as $record) {

                    if ($name === "customers") {
                        $this->registerCustomer($record);
                        $output->writeln("Traitement d'un enregistrement 'customer'");
                    } else if ($name === "purchases") {
                        $this->registerOrder($record);
                        $output->writeln("Traitement d'un enregistrement 'purchase'");
                    } else {
                        // Type d'enregistrement inconnu    
                        $output->writeln("Traitement d'un enregistrement 'inconnu'");
                    }
                }

                $output->writeln("Lecture du fichier: $filename");
            } else {
                $output->writeln("Fichier non trouvé: $filename");
            }
        }
        // Exécuter les opérations d'écriture en base de données
        $this->entityManager->flush();

        $io->success('Commande exécutée avec succès. ');

        return Command::SUCCESS;
    }

    private function registerCustomer($record)
    {

        if (!in_array("title", array_keys($record))) return;

        // Re-definie la civilité
        switch ($record['title']) {
            case '1':
                $record['title'] = "mme";
                break;
            case '2':
                $record['title'] = "m";
                break;
            default:
                break;
        }

        // Créer un nouvel objet customer
        $customer = (new Customer())
            ->setFirstname($record['firstname'])
            ->setLastname($record['lastname'])
            ->setPostalCode($record['postal_code'] == "" ? null : $record['postal_code'])
            ->setTitle($record['title'])
            ->setCity($record['city'])
            ->setEmail($record['email']);

        // Enregistre l'objet customer en base de données
        $this->entityManager->persist($customer);
    }


    private function registerOrder($record)
    {
        if (!in_array("customer_id", array_keys($record))) return;

        $customerRepository = $this->entityManager->getRepository(Customer::class);
        $customer = $customerRepository->find($record['customer_id']);

        // Si le customer associé n'existe pas en base
        if (!$customer) return;

        // Créer un nouvel objet order
        $order = (new Order())
            ->setPurchaseIdentifier($record['purchase_identifier'])
            ->setProductId($record['product_id'])
            ->setQuantity($record['quantity'])
            ->setPrice($record['price'])
            ->setCurrency($record['currency'])
            ->setDate(new DateTime($record['date']))
            ->setCustomer($customer);

        // Enregistrer l'objet order en base de données
        $this->entityManager->persist($order);
    }
}
