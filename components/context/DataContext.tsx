import { createContext, useContext, useEffect, useState } from "react";
import { cardsList } from "../../DataStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "../../api";
import { useSharedValue } from "react-native-reanimated";
interface card {
  name: string;
}
interface dataContextType {
  cardsData?: card[];
  translateButtonX?: any;
  buttonTranslateXCard?: any;
  setcardsData?: React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = createContext<dataContextType>({
  cardsData: [],
  translateButtonX: 0,
  buttonTranslateXCard: 0,
  setcardsData: () => {},
});
export const DataContextprovider = ({
  buttonTranslateXCard,
  translateButtonX,
  children,
}) => {
    const [cardsData, setcardsData] = useState();

  return (
    <DataContext.Provider
      value={{
        cardsData,
        buttonTranslateXCard,
        setcardsData,
        translateButtonX,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useContextValue=()=>{
const {buttonTranslateXCard,translateButtonX} = useContext(DataContext);
return { buttonTranslateXCard, translateButtonX };
}
