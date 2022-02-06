import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Button, Title } from "../../styles";
import logoutIcon from "../../icons/logout.svg";
import plusIcon from "../../icons/plus.svg";
import minusIcon from "../../icons/minus.svg";

import Transaction from "../../components/Transaction";
import { TransactionsPage, Header, List, Footer } from "./style";

export default function Transactions() {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [transactions, setTransactions] = useState(null);

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
        transactionsData.list.sort((t1, t2) => t2.timestamp - t1.timestamp);
        setTransactions(transactionsData);
      } catch (error) {
        alert(error.response.data);
        navigate("/");
      }
    }
    getTransactions();
  }, [token]);

  if (!transactions) {
    return <h1>Carregando...</h1>;
  }

  return (
    <TransactionsPage>
      <Header>
        <Title>Olá, {transactions.user}</Title>

        <img src={logoutIcon} alt="logout" onClick={logout} />
      </Header>

      <List>
        {transactions.list.length === 0 ? (
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
    </TransactionsPage>
  );
}
