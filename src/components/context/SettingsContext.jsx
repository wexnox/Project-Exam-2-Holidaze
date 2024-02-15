/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
import { useApi } from '../../js/utils/Api/api.js';
import PropTypes from 'prop-types';

const SettingsContext = createContext([null, () => {
}]);

const SettingsContextProvider = ({ children }) => {
    const { data, isLoading, isError, fetchData, created } = useApi();
    const [sort, setSort] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [isVenueSectionActive, setIsVenueSectionActive] = useState(null);

    const contextData = {
        data,
        isLoading,
        isError,
        fetchData,
        created,
        isVenueSectionActive,
        setIsVenueSectionActive,
        sort,
        setSort,
        sortOrder,
        setSortOrder,
    };

    return <SettingsContext.Provider value={contextData}>{children}</SettingsContext.Provider>;
};

SettingsContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SettingsContext, SettingsContextProvider };
