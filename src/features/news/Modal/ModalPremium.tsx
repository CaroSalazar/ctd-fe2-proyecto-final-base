import { FC } from "react";
import ContainerModal from "./ContenedorModal";
import { SuscribeImage } from "../../../assets";
import {  ImagenModal, CotenedorTexto, TituloModal, DescripcionModal, BotonSuscribir } from "../styled";

interface IModal {
  Close: () => void;
}

const ModalPremium: FC<IModal> = ({ Close }) => {
  const suscripcion = () => {
    setTimeout(() => {
      alert("Suscripto!");
      Close();
    }, 500);
  };

  return (
    <ContainerModal Close={Close}>
      <ImagenModal src={SuscribeImage} alt="mr-burns-excelent"/>
      <CotenedorTexto>
        <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
        <DescripcionModal>
          Suscríbete a nuestro newsletter y recibe noticias de nuestros
          personajes favoritos.
        </DescripcionModal>
        <BotonSuscribir onClick={suscripcion}>Suscríbete</BotonSuscribir>
      </CotenedorTexto>
    </ContainerModal>
  );
};

export default ModalPremium;
