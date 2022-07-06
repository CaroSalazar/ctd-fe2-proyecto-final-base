import Cita from "./Cita";
import { ICita } from "./types";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test.utils";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API_URL } from "../../app/constants";

type CitaRespuesta = ICita[];

const mockedCitaRespuesta: CitaRespuesta = [
  {
    character: "Homer Simpson",
    quote: "Gah, stupid sexy Flanders!",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
    characterDirection: "Right",
  },
];

const mockedCitaRespuesta2: CitaRespuesta = [
  {
    character: "Bart Simpson",
    quote: "Gah, stupid sexy Flanders!",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
    characterDirection: "Left",
  },
];
const worker = setupServer(
  rest.get<CitaRespuesta>(API_URL, (req, res, ctx) => {
    const personaje = req.url.searchParams.get("personaje");
    if (!personaje) {
      return res(ctx.json(mockedCitaRespuesta), ctx.delay(500));
    }
    return res(ctx.json(mockedCitaRespuesta2), ctx.delay(500));
  })
);

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

  it("Se debe obtener una cita del autor indicado", async () => {
    render(<Cita />);
    expect(screen.getByText("No se encontro ninguna cita")).toBeTruthy();

    const value = screen.getByPlaceholderText("Ingresa el nombre del autor");
    fireEvent.change(value, { target: { value: "Homer" } });

    const button =  await screen.findByRole("button", {
      name: "Obtener Cita",
    });
    fireEvent.click(button);

    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
    expect(await screen.findByText("Homer Simpson")).toBeInTheDocument();
    expect(await screen.findByText("Gah, stupid sexy Flanders!")).toBeInTheDocument();
  });
});
