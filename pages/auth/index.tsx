import { ChangeEvent, FormEvent, useState } from "react";
import { signInUser } from "../../config/firebase-config";
import { Container, Card } from "./styles";
const defaultFormFields = {
  email: "",
  password: "",
};

const Home = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInUser(email, password);
      if (userCredential) {
        resetFormFields();
      }
    } catch (error: any) {
      console.log("User Sign In Failed", error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Container>
      <Card>
        <h3>Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="form__input">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form__input">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form__input_button">
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default Home;
