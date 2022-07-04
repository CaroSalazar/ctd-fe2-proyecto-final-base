import Cita from "./Cita";
import { ICita } from "./types";
import { screen } from "@testing-library/react";
import { render } from "../../test.utils";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { API_URL } from "../../app/constants";

type CitaRespuesta = ICita;

const mockedCitaRespuesta: CitaRespuesta = 
  {
    personaje: "Homer Simpson",
    cita: "Gah, stupid sexy Flanders!",
    imagen:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
    direccionPersonaje: "Right",
  }
;

const worker = setupServer(
    rest.get<CitaRespuesta>(API_URL, (req, res, ctx) => {
      return res(ctx.json(mockedCitaRespuesta), ctx.delay(500));
    }
  ));
  
  beforeAll(() => {
    worker.listen();
  });
  
  afterEach(() => {
    worker.resetHandlers();
  });
  
  afterAll(() => {
    worker.close();
  });

  describe("Cita", () => {
    it("Se renderiza el componente Cita", () => {
      render(<Cita />);
  
      expect(screen.getByText("No se encontro ninguna cita")).toBeTruthy();
      expect(
        screen.getByPlaceholderText("Ingresa el nombre del autor")
      ).toBeTruthy();
      expect(
        screen.getByRole("button", { name: "Obtener cita aleatoria" })
      ).toBeTruthy();
      expect(screen.getByRole("button", { name: "Borrar" })).toBeTruthy();
    });
});