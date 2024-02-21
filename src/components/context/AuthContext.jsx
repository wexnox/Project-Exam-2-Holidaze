import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({ accessToken: null });

const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [venueManager, setVenueManager] = useState(false);
    const [profileData, setProfileData] = useState({});

    // Function to update profile data, can be called from any component within this context
    const updateProfileData = (newData) => {
        setProfileData((prevData) => ({ ...prevData, ...newData }));
    };
    // Function to toggle venue manager status
    const toggleVenueManager = () => {
        setVenueManager((prevStatus) => !prevStatus);
    };

    return <AuthContext.Provider value={[
        auth,
        setAuth,
        venueManager,
        setVenueManager,
        profileData,
        updateProfileData,
    ]}>
        {children}
    </AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider };
