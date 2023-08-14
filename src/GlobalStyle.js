import { createGlobalStyle } from "styled-components";

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
    }

    #root {
        width: 100%;
        height: 100%;
    }

    ::-webkit-scrollbar {
        display: none;
        width: 0.25rem;
        transition: all 1s ease-in-out;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 0.25rem;
        background: rgba(255, 128, 0, .6);
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 128, 0, .8);
    }
    
    @media (max-width: 900px) {
        #navbar {
            display: none;
        }
    }
`;

export default GlobalStyle;
