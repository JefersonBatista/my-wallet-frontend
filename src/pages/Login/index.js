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

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.login(formData);
      const token = response.data;
      setAndPersistToken(token);

      navigate("/transactions");
    } catch (error) {
      alert(error.response.data);
      setLoading(false);
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
          disabled={loading}
        />
        <Entry
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          value={formData.password}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          <span className="button-text">
            {loading ? "Entrando..." : "Entrar"}
          </span>
        </Button>
      </Form>

      <PageLink to={loading ? "#" : "/sign-up"}>
        Primeira vez? Cadastre-se!
      </PageLink>
    </Page>
  );
}
