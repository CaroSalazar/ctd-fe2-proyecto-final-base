import {
    TarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    BotonLectura,
  } from "../styled";
import { INoticiasNormalizadas } from "../types";

export interface ItarjetaNoticias {
    noticia: INoticiasNormalizadas,
    setModal: ( noticia: INoticiasNormalizadas)=>void
}

const TarjetaNoticias = ({noticia, setModal}: ItarjetaNoticias) =>{
return(
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={noticia.imagen} />
      <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>
        {noticia.descripcionCorta}
      </DescripcionTarjetaNoticia>
      <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
    </TarjetaNoticia>
)
}

export default TarjetaNoticias;