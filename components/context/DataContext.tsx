import { createContext, useEffect, useState } from "react";
import { cardsList } from "../../DataStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "../../api";
interface card {
  name: string;
}
interface dataContextType {
  cardsData: card[];
  setcardsData: React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = createContext<dataContextType>({
  cardsData: [],
  setcardsData: () => {},
});

export const DataContextprovider = ({ children }) => {
  const [cardsData, setcardsData] = useState();

  return (
    <DataContext.Provider value={{ cardsData, setcardsData }}>
      {children}
    </DataContext.Provider>
  );
};
