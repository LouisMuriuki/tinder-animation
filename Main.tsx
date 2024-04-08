import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  Button,
  Vibration,
  StatusBar,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import Card from "./components/Card";
import { DataContext } from "./components/context/DataContext";
import { useColorGenerator } from "./hooks/useColorgenerator";
import CustomButton from "./components/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "./api";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cardsList } from "./DataStore";

const Main = () => {
  const { cardsData, setcardsData } = useContext(DataContext);
  const query = useQuery({ queryKey: ["rockets"], queryFn: fetchAllShips });

  useEffect(() => {
    console.log(query.data);
    setcardsData(cardsList);
  }, []);

  const randomWidth = useSharedValue(10);

  const { width, height } = useWindowDimensions();
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  const filterCardData = useCallback(
    (name?: string) => {
      if (name) {
        setcardsData((prev: any[]) =>
          prev.filter((card: { name: string }) => card.name !== name)
        );
      } else {
        setcardsData(cardsData?.slice(0, -1));
      }
    },
    [cardsData]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: { name: string }; index: number }) => {
      const cardslength = cardsData?.length;
      const zIndex = cardslength - index;
      const cardheight =
        index > cardslength - 4 && index < cardslength
          ? height - height / 4 + zIndex * 20
          : height - height / 4;
      return (
        <View
          key={index}
          style={{
            zIndex,
            position: "absolute",
            bottom: -width * 0.85,
            left: -width * 0.425,
          }}
        >
          <Card
            key={index}
            item={item}
            height={cardheight}
            filterCardData={filterCardData}
          />
        </View>
      );
    },
    [cardsData]
  );

  const BottomButton = () => {
    return (
      <View
        style={{
          marginBottom: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <CustomButton
          height={60}
          width={60}
          icon_name={"close"}
          filterCardData={filterCardData}
        />
        <CustomButton
          height={60}
          width={60}
          icon_name={"heart"}
          filterCardData={filterCardData}
        />
        {cardsData && cardsData?.length > 0 ? null : (
          <CustomButton
            height={60}
            width={60}
            icon_name={"refresh-outline"}
            filterCardData={filterCardData}
          />
        )}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#4A154B",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={"#4A154B"} />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        data={cardsData ? cardsData : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <BottomButton />
    </SafeAreaView>
  );
};

export default Main;
