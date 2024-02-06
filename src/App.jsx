import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    {/*<Route path="profile" element={<Profile />} />*/}

                    {/*<Route path="accommodation" element={<Accommodation />} />*/}
                    {/*<Route path="accommodation/:slug" element={<Accommodation />} />*/}

                    {/*<Route path="about" element={<About />} />*/}
                    {/*<Route path="contact" element={<Contact />} />*/}

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Registration />} />

                    {/*<Route path="*" element={<NoMatch />} />*/}
                </Route>
            </Routes>
        </>
    );
}

export default App;
