import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';

// import Layout from './components/Layout';
// import Navbar from './components/Navbar';
// import Container from './components/Container';
import Welcome from './components/Welcome';
import SignInSide from './components/SignInSide';
import SignUp from './components/SignUp';

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/signin" element={<SignInSide />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;

