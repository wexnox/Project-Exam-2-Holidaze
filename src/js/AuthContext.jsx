import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext([null, () => {}]);

const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState();

    return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export { AuthContext, AuthContextProvider };
