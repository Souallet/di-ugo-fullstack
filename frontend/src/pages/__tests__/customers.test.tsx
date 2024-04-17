import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Permet d'utiliser les matchers de jest-dom
import CustomersPage from "../customers";

describe("CustomersPage component", () => {
  test("renders card header with title and description", () => {
    render(<CustomersPage />);
    const titleElement = screen.getByText("Liste des clients");
    const descriptionElement = screen.getByText(
      "Ensemble des clients importés depuis les fichiers CSV"
    );

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
