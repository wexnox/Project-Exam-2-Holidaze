import React, { createContext, useState } from 'react';
import { useApi } from '../../js/api.js';

export const SettingsContext = createContext([]);

function SettingsContextProvider({ children }) {
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
}


export default SettingsContextProvider;
