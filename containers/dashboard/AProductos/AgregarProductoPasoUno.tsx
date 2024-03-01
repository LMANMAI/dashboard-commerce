import React from "react";
import { Button } from "antd";

interface Props {
  product: any;
  handleInputChange: (fieldName: string, value: any) => void;
  handleNextStep: () => void;
}

const AgregarProductoPasoUno: React.FC<Props> = ({
  product,
  handleInputChange,
  handleNextStep,
}) => {
  return (
    <div>
      {/* Renderizar campos de formulario del paso uno */}
      <Button onClick={handleNextStep}>Siguiente</Button>
    </div>
  );
};

export default AgregarProductoPasoUno;
