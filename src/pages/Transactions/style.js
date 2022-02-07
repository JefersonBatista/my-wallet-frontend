import styled from "styled-components";

export const Page = styled.section`
  width: 100%;

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

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 78px - 143px);
  border-radius: 5px;
  padding: 23px 12px 12px;
  background-color: white;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;

  width: 100%;
  height: calc(100% - 30px);

  overflow-y: auto;

  font-size: 20px;
  color: black;

  .no-transactions-text {
    margin: auto;

    text-align: center;
    color: #868686;
  }
`;

export const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: 30px;

  span {
    font-size: 19px;
  }

  .text {
    text-transform: uppercase;
    font-weight: bold;
    color: black;
  }

  .positive {
    color: #03ac00;
  }

  .negative {
    color: #c70000;
  }

  .neutral {
    color: black;
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
