import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    vertical-align: top;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    background: #161a2e;
    color: #fff;
    font-family: 'Ubuntu', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input {
    font-family: 'Ubuntu', 'Helvetica Neue', sans-serif;
  }
  button {
    font-family: 'Ubuntu', 'Helvetica Neue', sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    display: flex;
    width: 100%;
  }
  #root,
  .routerwrap {
    min-height: 100%;
  }
  .routerwrap {
    flex: 1;
  }

  [data-whatintent='mouse'] *:focus {
    outline: none;
  }
`;

export default GlobalStyles;
