import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";
import ModalPremium from "./Modal/ModalPremium";
import ModalComun from "./Modal/ModalComun";
import TarjetaNoticias from "./TarjetaNoticias/TarjetaNoticias";
import { capitalizeAll, getMinutes } from "./utils";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  const Modal = modal?.esPremium ? ModalPremium : ModalComun;

  const ModalClose = () => setModal(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = capitalizeAll(n.titulo);

        const minutosTranscurridos = getMinutes(n.fecha);

        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia: INoticiasNormalizadas) => (
          <TarjetaNoticias noticia={noticia} setModal={setModal} />
        ))}
        {modal && <Modal dataModal={modal} Close={ModalClose} />}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
