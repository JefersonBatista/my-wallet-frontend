import { useState } from "react";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/Logo";
import { Button, Entry, PageLink } from "../../styles";

import { Form, Page } from "./style";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { setAndPersistToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.login(formData);
      const token = response.data;
      setAndPersistToken(token);

      navigate("/transactions");
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <Page>
      <Logo />

      <Form onSubmit={handleSubmit}>
        <Entry
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={formData.email}
        />
        <Entry
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          value={formData.password}
        />
        <Button type="submit">
          <span className="button-text">Entrar</span>
        </Button>
      </Form>

      <PageLink to="/sign-up">Primeira vez? Cadastre-se!</PageLink>
    </Page>
  );
}
