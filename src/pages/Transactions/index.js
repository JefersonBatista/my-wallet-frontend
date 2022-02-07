import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Button, Title } from "../../styles";
import logoutIcon from "../../icons/logout.svg";
import plusIcon from "../../icons/plus.svg";
import minusIcon from "../../icons/minus.svg";

import Transaction from "../../components/Transaction";
import { Page, Header, Container, List, Balance, Footer } from "./style";

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

  async function logout() {
    await api.logout(token);
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.getTransactions(token);
        const transactionsData = response.data;
        // transactionsData.list.sort((t1, t2) => t2.timestamp - t1.timestamp);
        setTransactions(transactionsData);
      } catch (error) {
        alert(error.response.data);
        navigate("/");
      }
    }
    getTransactions();
  }, [token]);

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

        <img src={logoutIcon} alt="logout" onClick={logout} />
      </Header>

      <Container>
        <List>
          {emptyList === 0 ? (
            <span className="no-transactions-text">
              Não há registros de
              <br />
              entrada ou saída
            </span>
          ) : (
            transactions.list.map((transaction) => {
              return <Transaction key={transaction._id} {...transaction} />;
            })
          )}
        </List>

        <Balance>
          <span className="text">Saldo</span>
          <span className={balanceSignal()}>{balanceStr}</span>
        </Balance>
      </Container>

      <Footer>
        <Button
          height="114px"
          fontSize="17px"
          onClick={() => navigate("/register-transaction/incoming")}
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
          onClick={() => navigate("/register-transaction/outgoing")}
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
