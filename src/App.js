import { Fragment } from 'react';

import GlobalStyle from './GlobalStyle';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Container from './components/Container';

function App() {
    return (
        <Fragment>
            <GlobalStyle />

            <Layout>
                <Navbar></Navbar>
                <Container></Container>
            </Layout>
        </Fragment>
    );
}

export default App;

