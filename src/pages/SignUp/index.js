import { useState } from "react";

import api from "../../services/api";
import Logo from "../../components/Logo";
import { Button, Entry, PageLink } from "../../styles";

import { SignUpForm, SignUpPage } from "./style";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Você inseriu senhas diferentes");
      return;
    }

    const newUserData = { ...formData };
    delete newUserData.repeatPassword;

    try {
      await api.signUp(newUserData);

      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <SignUpPage>
      <Logo />

      <SignUpForm onSubmit={handleSubmit}>
        <Entry
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          value={formData.name}
        />
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
        <Entry
          type="password"
          name="repeatPassword"
          placeholder="Confirme a senha"
          onChange={handleChange}
          value={formData.repeatPassword}
        />
        <Button type="submit">
          <span className="button-text">Cadastrar</span>
        </Button>
      </SignUpForm>

      <PageLink to="/">Já tem uma conta? Entre agora!</PageLink>
    </SignUpPage>
  );
}
