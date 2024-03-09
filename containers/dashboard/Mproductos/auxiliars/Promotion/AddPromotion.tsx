import React, { useContext } from "react";
import { ModalAddPromotionsContainer } from "../../styles";
import { SelectComponent } from "../../../../../components";
import { SelectMockDataGenre, SelectMockDataBrand } from "../../statics";
import { Input } from "antd";
import { FunctionsContext } from "../../../../../context/functionsMisProductosContext";

const AddPromotionComponent: React.FC = () => {
  const { promotion, promovalue, handleChangePromotionsDTO, setPromoValue } =
    useContext(FunctionsContext);

  return (
    <div>
      <h2>Agregar una promoción</h2>
      <div>
        <p>
          Seleccione el tipo de productos al que quiere aplciarle un descuento,
          recuerde que las promociones vigentes de pueden visualizar y eliminar
          en el menu continuo de <strong>"Mis promociones"</strong>
        </p>

        <ModalAddPromotionsContainer>
          <div className="select__discount">
            <SelectComponent
              value={promotion.brand}
              options={SelectMockDataBrand}
              class_select={"select__mproducts"}
              value_label={"brand"}
              handleChange={(e: any) => handleChangePromotionsDTO("brand", e)}
            />
            <div></div>
          </div>

          <div className="select__discount">
            <SelectComponent
              value={promotion.genre}
              options={SelectMockDataGenre}
              class_select={"select__mproducts"}
              value_label={"genre"}
              handleChange={(e: any) => handleChangePromotionsDTO("genre", e)}
            />
            <div></div>
          </div>

          <div className="input__discount">
            <Input
              addonBefore="Valor del descuento"
              addonAfter="%"
              className="input__addform precio"
              placeholder="ej: 2"
              type="number"
              name="name"
              value={promovalue}
              onChange={(value) =>
                setPromoValue(parseFloat(value.target.value))
              }
            />
          </div>
        </ModalAddPromotionsContainer>
      </div>
    </div>
  );
};

export default AddPromotionComponent;
