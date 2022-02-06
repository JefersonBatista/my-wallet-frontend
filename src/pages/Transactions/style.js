import styled from "styled-components";

export const TransactionsPage = styled.section`
  img {
    width: 24px;
    height: 24px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 78px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;

  height: calc(100vh - 78px - 143px);
  border-radius: 5px;
  padding: 23px 12px;
  background-color: white;

  overflow-y: auto;

  font-size: 20px;
  color: black;

  .no-transactions-text {
    margin: auto;

    text-align: center;
    color: #868686;
  }
`;

export const Footer = styled.footer`
  display: flex;
  gap: 15px;
  align-items: center;

  width: 100%;
  height: 143px;

  .button-text,
  .button-icon {
    text-align: left;
    align-self: flex-start;
  }
`;
