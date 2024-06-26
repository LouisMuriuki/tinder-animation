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
  translateButtonX: any;
  buttonTranslateXCard: any;
  setcardsData: React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = createContext<dataContextType>({
  cardsData: [],
  translateButtonX: 0,
  buttonTranslateXCard: 0,
  setcardsData: () => {},
});

export const DataContextprovider = ({ children }) => {
  const [cardsData, setcardsData] = useState();
  const translateButtonX = useSharedValue<number>(0);
  const buttonTranslateXCard = useSharedValue<number>(0);

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
