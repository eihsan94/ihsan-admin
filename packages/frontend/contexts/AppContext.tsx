import { AppState } from "@libTypes/types";
import  { useState, createContext, FC, useContext} from "react";

// Create Context Object
const initAppState: AppState = {
  status: 200,
  json: {
      menus: [],
      admin: {
          roles: [],
          users: [],
      }
  }
}
export const AppContext = createContext({
  appState: initAppState, 
  setCurrentAppState: (state:AppState) => {}
});

// Create a provider for components to consume and subscribe to changes
export const AppContextProvider: FC = ({children}) => {
  const [appState, setAppState] = useState<AppState>(initAppState);

  const setCurrentAppState = (state: AppState) => {
    setAppState(state)
  }
  return (
    <AppContext.Provider value={{appState, setCurrentAppState}}>
      {children}
    </AppContext.Provider>
  );
};
export  const useAppContext = () => useContext(AppContext);