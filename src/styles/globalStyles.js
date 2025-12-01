import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Fuente y colores generales */
  body {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f8f9fa;
    color: #212529;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button {
    font-family: inherit;
  }

  /* Navbar */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .navbar a {
    margin-right: 15px;
    font-weight: bold;
    color: #0d6efd;
  }

  .navbar a:hover {
    text-decoration: underline;
  }

  /* Botones personalizados */
  .kawaii-button {
    background-color: #cd20f8;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }

  .kawaii-button:hover {
    background-color: #a815c4;
  }
`;

export default GlobalStyles;
