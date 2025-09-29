import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  .toast-sucess {
    [data-sonner-toast][data-type=success] {
      background: #E9FFD4 !important;
      border: 1px solid #7BBA25 !important;
      color: #000000D9 !important;
      margin-right: 0px !important;
    }

    --toast-icon-margin-end: 0px !important;
    --toast-icon-margin-start: 0px !important;
  }
`;
