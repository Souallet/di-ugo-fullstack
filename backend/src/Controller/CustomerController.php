<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Entity\Order;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/customers')]
class CustomerController extends AbstractController
{

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly SerializerInterface $serializer,
        private readonly CustomerRepository $customerRepository
    ) {
    }

    #[Route('/', name: 'customers_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $customers = $this->customerRepository->findAll();

        $data = [
            "total" => sizeof($customers),
            "data" => $customers
        ];

        $serializedData = $this->serializer->serialize($data, 'json', [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['orders']
        ]);

        return new JsonResponse($serializedData, 200, [], true);
    }

    #[Route('/{customer_id}/orders', name: 'customer_orders', methods: ['GET'])]
    public function getCustomerOrders(int $customer_id): JsonResponse
    {
        // Récupérer le client spécifique à partir de son ID
        $customer = $this->customerRepository->find($customer_id);

        // Vérifier si le client existe
        if (!$customer) {
            throw $this->createNotFoundException('Customer not found');
        }

        $orderRepository = $this->entityManager->getRepository(Order::class);
        $orders = $orderRepository->findBy(['customer' => $customer]);

        // Sérialiser le client et ses commandes associées en JSON
        $data = [
            "total" => sizeof($orders),
            'data' => $orders,
        ];

        $jsonResponse = $this->serializer->serialize($data, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($jsonResponse, 200, [], true);
    }
}
