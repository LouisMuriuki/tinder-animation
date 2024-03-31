import { createContext, useEffect, useState } from "react";
import { cardsList } from "../../DataStore";
interface card{
    name:string
}
interface dataContextType {
  cardsData:card[];
  setcardsData: React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = createContext<dataContextType>({
  cardsData: [],
  setcardsData: () => {},
});


export const DataContextprovider = ({ children }) => {
  const [cardsData, setcardsData] = useState();
  useEffect(() => {
    //@ts-expect-error
    setcardsData(cardsList.reverse());
  }, []);
  return (
    <DataContext.Provider value={{ cardsData, setcardsData }}>
      {children}
    </DataContext.Provider>
  );
};
