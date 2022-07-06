import React, { FC } from "react";
import { ContenedorModal, TarjetaModal, CloseButton } from "../styled";
import CloseImg from "../../../assets/close.png";
import {INoticiasNormalizadas }from "../types";

interface IContainerModal {
  Close: () => void;
  children: React.ReactNode;
}

const ContainerModal: FC<IContainerModal> = ({ Close, children }) => {
  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton onClick={Close}>
          <img src={CloseImg} alt="close-button" />
        </CloseButton>
        {children}
      </TarjetaModal>
    </ContenedorModal>
  );
};
export default ContainerModal;
