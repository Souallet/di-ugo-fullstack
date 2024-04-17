import { render, screen } from "@testing-library/react";
import Loader from "../loader";

test("renders learn react link", () => {
  render(<Loader />);
  const linkElement = screen.getByText("Chargement en cours");
  expect(linkElement).toBeInTheDocument();
});
