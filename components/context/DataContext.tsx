import { createContext, useEffect, useState } from "react";
import { cardsList } from "../../DataStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "../../api";
import { useSharedValue } from "react-native-reanimated";
interface card {
  name: string;
}
interface dataContextType {
  cardsData: card[];
  translatex:any;
  translatey:any;
  setcardsData: React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = createContext<dataContextType>({
  cardsData: [],
  translatex:0,
  translatey:0,
  setcardsData: () => {},
});


export const DataContextprovider = ({ children }) => {
  const [cardsData, setcardsData] = useState();
const translatex = useSharedValue<number>(0);
const translatey = useSharedValue<number>(0);

  return (
    <DataContext.Provider value={{ cardsData, setcardsData ,translatex,translatey}}>
      {children}
    </DataContext.Provider>
  );
};
