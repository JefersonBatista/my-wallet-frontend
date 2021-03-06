import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Button, Title } from "../../styles";
import plusIcon from "../../icons/plus.svg";
import minusIcon from "../../icons/minus.svg";

import Transaction from "../../components/Transaction";
import { Page, Header, Container, List, Balance, Footer } from "./style";
import LogoutIcon from "../../components/LogoutIcon";

export default function Transactions() {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [transactions, setTransactions] = useState(null);

  const emptyList = transactions?.list.length === 0;

  transactions?.list.sort((t1, t2) => t2.timestamp - t1.timestamp);

  const balance = transactions?.list
    .map((transaction) => {
      if (transaction.type === "incoming") {
        return transaction.value;
      } else {
        return -transaction.value;
      }
    })
    .reduce((a, b) => a + b, 0);
  const balanceStr = balance?.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function balanceSignal() {
    if (balance > 0) {
      return "positive";
    } else if (balance < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  }

  function timestampToLocalDateString(timestamp) {
    return dayjs(timestamp).format("DD/MM");
  }

  async function logout() {
    try {
      await api.logout(token);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function deleteTransaction(id, description) {
    if (!window.confirm(`Deseja mesmo deletar a transação '${description}'?`)) {
      return;
    }

    try {
      await api.deleteTransaction(token, id);
      getTransactions();
    } catch (error) {
      alert(error.response.data);
      navigate("/");
    }
  }

  async function getTransactions() {
    try {
      const response = await api.getTransactions(token);
      setTransactions(response.data);
    } catch (error) {
      alert(error.response.data);
      navigate("/");
    }
  }

  useEffect(() => getTransactions(), [token]);

  if (!transactions) {
    return (
      <Header>
        <Title>Carregando...</Title>
      </Header>
    );
  }

  return (
    <Page>
      <Header>
        <Title>Olá, {transactions.user}</Title>

        <LogoutIcon onClick={logout}></LogoutIcon>
      </Header>

      <Container>
        <List>
          {emptyList ? (
            <span className="no-transactions-text">
              Não há registros de
              <br />
              entrada ou saída
            </span>
          ) : (
            transactions.list.map((transaction) => {
              return (
                <Transaction
                  key={transaction._id}
                  {...transaction}
                  date={timestampToLocalDateString(transaction.timestamp)}
                  deleteTransaction={() =>
                    deleteTransaction(transaction._id, transaction.description)
                  }
                  updateTransaction={() =>
                    navigate(
                      `/transactions/edit/${transaction.type}/${transaction._id}`
                    )
                  }
                />
              );
            })
          )}
        </List>

        {emptyList || (
          <Balance>
            <span className="text">Saldo</span>
            <span className={balanceSignal()}>{balanceStr}</span>
          </Balance>
        )}
      </Container>

      <Footer>
        <Button
          height="114px"
          fontSize="17px"
          onClick={() => navigate("/transactions/register/incoming")}
        >
          <img src={plusIcon} alt="" />

          <span className="button-text">
            Nova
            <br />
            entrada
          </span>
        </Button>
        <Button
          height="114px"
          fontSize="17px"
          onClick={() => navigate("/transactions/register/outgoing")}
        >
          <img src={minusIcon} alt="" />
          <span className="button-text">
            Nova
            <br />
            saída
          </span>
        </Button>
      </Footer>
    </Page>
  );
}
