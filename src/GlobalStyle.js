import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        font-size: 16px;
    }

    #root {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 900px) {
        #navbar {
            display: none;
        }
    }
`;

export default GlobalStyle;