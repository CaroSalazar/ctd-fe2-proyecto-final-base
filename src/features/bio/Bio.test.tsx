import Bio from "./Bio";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Bio", () => {
  it("Se debe renderizar la informacion de Bart Simpson", async () => {
    render(<Bio />);
    expect(screen.getByText("Bart Simpson")).toBeInTheDocument();
  });

  it("Se debe renderizar la informacion del personaje seleccionado(Lisa Simpson)", async () => {
    render(<Bio />);
    const btnLisa = screen.getByRole("button", {
      name: "LISA",
    });
    userEvent.click(btnLisa);
    expect(await screen.findByText("Lisa Simpson")).toBeInTheDocument();
  });
});
