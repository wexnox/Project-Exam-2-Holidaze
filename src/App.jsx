import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import Venues from './components/venues/Venues.jsx';
import VenueDetails from './components/venues/VenueDetails.jsx';
import NotFound from './components/NotFound.jsx';
import Profile from './components/Profile/Profile.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Search from './components/Search.jsx';
import CreateVenue from './components/venues/CreateVenue.jsx';
// import ThemeSwitcher from './js/ThemeSwitcher';

// TODO: Convert to 6* routes. createBrowserRouter(createRoutesFromElements())
function App() {

    return (
        <>
            <Routes>
                {/*<div className="flex justify-center items-center h-screen">*/}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="profile" element={<Profile />} />

                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Registration />} />

                    <Route path="venues" element={<Venues />} />
                    <Route path="venues/venue-details/:id" element={<VenueDetails />} />
                    <Route path="/create-venue" element={<CreateVenue />} />

                    <Route path="/search/:value" element={<Search />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
                {/*<ThemeSwitcher />*/}
                {/*</div>*/}
            </Routes>
        </>
    );
}

export default App;