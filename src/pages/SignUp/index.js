import { useState } from "react";

import api from "../../services/api";
import Logo from "../../components/Logo";
import { Button, Entry, PageLink } from "../../styles";

import { Form, Page } from "./style";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (formData.password !== formData.repeatPassword) {
      alert("Você inseriu senhas diferentes");
      setLoading(false);
      return;
    }

    const newUserData = { ...formData };
    delete newUserData.repeatPassword;

    try {
      await api.signUp(newUserData);

      navigate("/");
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
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          value={formData.name}
          disabled={loading}
        />
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
        <Entry
          type="password"
          name="repeatPassword"
          placeholder="Confirme a senha"
          onChange={handleChange}
          value={formData.repeatPassword}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          <span className="button-text">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </span>
        </Button>
      </Form>

      <PageLink to={loading ? "#" : "/"}>
        Já tem uma conta? Entre agora!
      </PageLink>
    </Page>
  );
}
