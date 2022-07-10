import React from "react";
import ContainerModal from "./ContenedorModal";
import { INoticiasNormalizadas } from "../types";
import { ImagenModal, CotenedorTexto, TituloModal, DescripcionModal} from "../styled";

interface IModal {
  dataModal: INoticiasNormalizadas;
  Close: () => void;
}

const Modal: React.FC<IModal> = ({
  dataModal: { imagen, descripcion, titulo },
  Close,
}) => (
  <ContainerModal  Close={Close}>
    <ImagenModal src={imagen} alt="news-image" />
    <CotenedorTexto>
      <TituloModal>{titulo}</TituloModal>
      <DescripcionModal>{descripcion}</DescripcionModal>
    </CotenedorTexto>
  </ContainerModal>
);

export default Modal;