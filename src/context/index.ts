import { createContext } from "react";
import { AppContextType } from "../app/types";

export const AppContext = createContext<AppContextType | undefined>(undefined);
