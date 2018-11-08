import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background: #161a2e;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    color: #fff;
    font-family: 'Ubuntu', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    display: flex;
  }
  #root,
  .routerwrap {
    min-height: 100%;
  }
  .routerwrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }
`;

export default GlobalStyles;
