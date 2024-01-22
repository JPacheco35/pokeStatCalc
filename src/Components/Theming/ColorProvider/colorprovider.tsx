import { createContext, useContext } from 'react';

const ColorProviderContext = createContext(null);

export const useColor = () => {
    return useContext(ColorProviderContext);
};

export const ColorProvider = ({ children, color, setColor }) => {
    const value = {
        color: color,
        setColor: setColor
    };

    return (
        <ColorProviderContext.Provider value={value}>
            {children}
        </ColorProviderContext.Provider>
    );
};