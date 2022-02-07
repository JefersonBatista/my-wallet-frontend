import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Button, Entry, Title } from "../../styles";

import { Page, Header, Form } from "./style";

export default function TransactionOperations() {
  const { operation, type, id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [formData, setFormData] = useState({
    value: "",
    description: "",
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleCreation(event) {
    event.preventDefault();

    const newTransactionData = { ...formData };
    newTransactionData.type = type;
    newTransactionData.value = parseFloat(formData.value);

    try {
      await api.registerTransaction(token, newTransactionData);

      navigate("/transactions");
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();

    const updatedTransactionData = { ...formData };
    updatedTransactionData.type = type;
    updatedTransactionData.value = parseFloat(formData.value);

    try {
      await api.updateTransaction(token, id, updatedTransactionData);

      navigate("/transactions");
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <Page>
      <Header>
        <Title>
          {operation === "register" ? "Nova" : "Editar"}{" "}
          {type === "incoming" ? "entrada" : "saída"}
        </Title>
      </Header>

      <Form onSubmit={operation === "register" ? handleCreation : handleUpdate}>
        <Entry
          type="number"
          name="value"
          placeholder="Valor"
          onChange={handleChange}
          value={formData.value}
        />
        <Entry
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={handleChange}
          value={formData.description}
        />
        <Button type="submit">
          <span className="button-text">
            {operation === "register" ? "Salvar" : "Atualizar"}{" "}
            {type === "incoming" ? "entrada" : "saída"}
          </span>
        </Button>
      </Form>
    </Page>
  );
}
