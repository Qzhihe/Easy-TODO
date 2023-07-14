import { Fragment } from 'react';

import GlobalStyle from './GlobalStyle';

// import Layout from './components/Layout';
// import Navbar from './components/Navbar';
// import Container from './components/Container';
// import Welcome from './components/Welcome';
// import SignInSide from './components/SignInSide';
import SignUp from './components/SignUp';

function App() {
    return (
        <Fragment>
            <GlobalStyle />

            {/* <Layout>
                <Navbar></Navbar>
                <Container></Container>
            </Layout>

            <Welcome /> */}
            {/* <SignInSide /> */}
            <SignUp />
        </Fragment>
    );
}

export default App;

