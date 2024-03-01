import React from "react";
import { Button } from "antd";

interface Props {
  product: any;
  handlePrevStep: () => void;
}

const AgregarProductoPasoTres: React.FC<Props> = ({
  product,
  handlePrevStep,
}) => {
  return (
    <div>
      {/* Renderizar campos de formulario del paso tres */}
      <Button onClick={handlePrevStep}>Anterior</Button>
    </div>
  );
};

export default AgregarProductoPasoTres;
