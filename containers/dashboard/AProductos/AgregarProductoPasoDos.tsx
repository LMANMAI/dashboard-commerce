import React from "react";
import { Button } from "antd";

interface Props {
  file: any;
  imgs1: any[];
  onFinish: () => void;
  handlePrevStep: () => void;
  handleChangeFile: (file: any) => void;
  handleChangeImages: (images: any[]) => void;
}

const AgregarProductoPasoDos: React.FC<Props> = ({
  file,
  imgs1,
  onFinish,
  handlePrevStep,
  handleChangeFile,
  handleChangeImages,
}) => {
  return (
    <div>
      {/* Renderizar campos de formulario del paso dos */}
      <Button onClick={onFinish}>Guardar</Button>
    </div>
  );
};

export default AgregarProductoPasoDos;
