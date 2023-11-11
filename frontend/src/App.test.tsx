import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

test("smoke test", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const Logo = screen.getByAltText("Logo");
  
  expect(Logo).toBeInTheDocument();
});
