import { render, screen } from "@testing-library/react";
import MessageUser from "../../components/MessageUser";

test("renders learn react link", () => {
  render(<MessageUser text={"Test"} />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});