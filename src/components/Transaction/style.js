import styled from "styled-components";

export const TransactionItem = styled.article`
  display: flex;
  justify-content: space-between;

  font-size: 16px;

  .date {
    margin-right: 10px;
    color: #c6c6c6;
  }

  .description {
    color: black;
  }

  .incoming {
    margin-left: 10px;
    color: #03ac00;
  }

  .outgoing {
    margin-left: 10px;
    color: #c70000;
  }
`;
