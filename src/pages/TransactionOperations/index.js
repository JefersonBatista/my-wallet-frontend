import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Button, Entry, Title } from "../../styles";

import { Page, Header, Form, Options } from "./style";

export default function TransactionOperations() {
  const { operation, type, id } = useParams();

  const navigate = useNavigate();

  const { token } = useAuth();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTransactionData() {
      setLoading(true);

      if (operation !== "edit") {
        setFormData({
          value: "",
          description: "",
        });

        setLoading(false);
        return;
      }

      try {
        const response = await api.getTransactionById(token, id);
        const { value, description } = response.data;
        setFormData({ value, description });

        setLoading(false);
      } catch (error) {
        alert(error.response.data);

        navigate("/transactions");
      }
    }

    getTransactionData();
  }, [token, id, operation]);

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleCreation(event) {
    event.preventDefault();
    setLoading(true);

    const newTransactionData = { ...formData };
    newTransactionData.type = type;
    newTransactionData.value = parseFloat(formData.value);

    try {
      await api.registerTransaction(token, newTransactionData);

      navigate("/transactions");
    } catch (error) {
      alert(error.response.data);
      setLoading(false);
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setLoading(true);

    const updatedTransactionData = { ...formData };
    updatedTransactionData.type = type;
    updatedTransactionData.value = parseFloat(formData.value);

    try {
      await api.updateTransaction(token, id, updatedTransactionData);

      navigate("/transactions");
    } catch (error) {
      alert(error.response.data);
      setLoading(false);
    }
  }

  if (!formData) {
    return (
      <Header>
        <Title>Carregando...</Title>
      </Header>
    );
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
          disabled={loading}
        />
        <Entry
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={handleChange}
          value={formData.description}
          disabled={loading}
        />
        <Options>
          <Button type="submit" disabled={loading}>
            <span className="button-text">
              {operation === "register"
                ? loading
                  ? "Salvando..."
                  : "Salvar"
                : loading
                ? "Atualizando..."
                : "Atualizar"}{" "}
              {loading ? "" : type === "incoming" ? "entrada" : "saída"}
            </span>
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={() => navigate("/transactions")}
          >
            <span className="button-text">Cancelar</span>
          </Button>
        </Options>
      </Form>
    </Page>
  );
}
