import { API_URL } from "../../app/constants";
import { ICita } from "./types";

export const obtenerCita: (character?: string) => Promise<ICita> = async (
  character
) => {
  if (character && parseInt(character)) {
    throw new Error("El nombre debe ser un texto");
  }

  const url = character ? `${API_URL}?character=${character}` : API_URL;
  const respuesta = await fetch(url);
  const [data] = await respuesta.json();

  const dataNormalizada = {
    quote: data.quote,
    character: data.character,
    image: data.image,
    characterDirection: data.characterDirection,
  };

  return dataNormalizada;
};
