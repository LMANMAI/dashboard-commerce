import { useState } from "react";
import { signInUser } from "../../config/firebase-config";
import { Container, Card } from "./styles";
import { Input, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { CustomButton } from "@containers/dashboard/AProductos/styles";
const defaultFormFields = {
  email: "",
  password: "",
};

const Home = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [api, contextHolder] = notification.useNotification();
  const [load, setLoad] = useState<boolean>(false);
  const openNotification = (placement: NotificationPlacement, msg: any) => {
    api.info({
      message: msg,
      description:
        "Es probable que no tenga permisos para ingresar, contactese con el proveedor de datos para solicitar acceso.",
      placement,
    });
  };

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoad(true);
    try {
      const userCredential = await signInUser(email, password);
      if (userCredential) {
        resetFormFields();
        setLoad(false);
      }
    } catch (error: any) {
      setLoad(false);
      openNotification("bottomRight", error.message);
    }
  };

  const handleChange = (value: any, fieldName: string) => {
    setFormFields({ ...formFields, [fieldName]: value });
  };

  return (
    <Container>
      <Card>
        {contextHolder}
        <h3>Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="form__input">
            <Input
              value={email}
              className="input__addform precio"
              placeholder="Correo electronico"
              type="text"
              onChange={(value) => handleChange(value.target.value, "email")}
            />
          </div>
          <div className="form__input">
            <Input
              value={password}
              className="input__addform precio"
              placeholder="Contraseña"
              type="password"
              onChange={(value) => handleChange(value.target.value, "password")}
            />
          </div>
          <div className="form__input_button">
            <CustomButton
              onClick={(e) => handleSubmit(e)}
              className={`${load ? "disabled" : ""} `}
              disabled={load}
              title="Ingresar a la cuenta"
            >
              Ingresar
            </CustomButton>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default Home;
