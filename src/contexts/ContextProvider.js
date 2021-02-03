import React, { createContext, useContext, useReducer} from 'react'

// Data layer
const StateContext = createContext();

// Provider 
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={ useReducer( reducer, initialState )}>
        {children}
    </StateContext.Provider>
)

export const useContextProvider = () => useContext(StateContext)