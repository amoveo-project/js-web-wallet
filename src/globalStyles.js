import { createGlobalStyle } from 'styled-components';

import OCRAExtendedEot from 'shared/assets/fonts/OCRAExtended/OCRAExtended.eot';
import OCRAExtendedWoff from 'shared/assets/fonts/OCRAExtended/OCRAExtended.woff';
import OCRAExtendedWoff2 from 'shared/assets/fonts/OCRAExtended/OCRAExtended.woff2';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'OCRAExtended';
    src:  url('${OCRAExtendedEot}?#iefix') format('embedded-opentype'),
          url('${OCRAExtendedWoff}') format('woff'),
          url('${OCRAExtendedWoff2}') format('woff2');
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
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
    width: 100%;
  }
  #root,
  .routerwrap {
    min-height: 100%;
  }
  .routerwrap {
    flex: 1;
  }
`;

export default GlobalStyles;
