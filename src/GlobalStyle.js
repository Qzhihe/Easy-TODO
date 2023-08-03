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
        font-size: 16px;
    }

    #root {
        width: 100%;
        height: 100%;
    }

    .no-hover:hover {
        background-color: rgba(0, 0, 0, 0) !important;
    }

    .priority {
        &-high {
            color: #e03130;
        }

        &-medium {
            color: #ffb000;
        }
        
        &-low {
            color: #4772f9;
        }
    
        &-none {
            color: #a3a3a3;
        }
    }
    
    @media (max-width: 900px) {
        #navbar {
            display: none;
        }
    }
`;

export default GlobalStyle;
