<?php

use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use App\Command\UgoOrdersImportCommand;
use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;

class UgoOrdersImportCommandTest extends TestCase
{
    public function testExecute(): void
    {
        // Création d'une instance de l'application Symfony
        $application = new Application();

        // Création d'une instance de l'EntityManager (ou récupération à partir du conteneur de services)
        $entityManager = $this->createMock(EntityManagerInterface::class); // Utilisation de PHPUnit pour créer un mock

        // Ajout de la commande à tester à l'application
        $application->add(new UgoOrdersImportCommand($entityManager));

        // Nous nous attendons à ce que la méthode persist() soit appelée exactement 5 fois
        $entityManager->expects($this->exactly(4))
            ->method('persist')
            ->with($this->isInstanceOf(Customer::class));

        // Récupération de la commande à tester
        $command = $application->find('ugo:orders:import');

        // Création d'un testeur de commande pour la commande à tester
        $commandTester = new CommandTester($command);

        // Exécution de la commande
        $commandTester->execute([]);

        // Récupération de la sortie de la commande
        $output = $commandTester->getDisplay();

        // Vérification du code de sortie de la commande
        $statusCode = $commandTester->getStatusCode();
        $this->assertSame(0, $statusCode);
    }
}
