import { ESTADO_FETCH } from "./constants";
import citaReducer, { EstadoCita } from "./citaSlice";

describe("Reducer", () => {
  const initialState: EstadoCita = {
    data: null,
    estado: ESTADO_FETCH.INACTIVO,
  };
  describe("as default", () => {
    it("Debe devolver el estado inicial", () => {
      const actual = citaReducer(initialState, { type: "any" });
      expect(actual).toEqual(initialState);
    });
  });

  describe("on clear", () => {
    const initialState: EstadoCita = {
      data: {
        character: "personaje",
        quote: "cita",
        image: "imagen",
        characterDirection: "direccion",
      },
      estado: ESTADO_FETCH.INACTIVO,
    };
    it("Deberia limpiar el estado", () => {
      expect(citaReducer(initialState, { type: "citas/limpiar" })).toEqual({
        data: null,
        estado: ESTADO_FETCH.INACTIVO,
      });
    });
  });
});
