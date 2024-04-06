import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  Button,
  Vibration,
} from "react-native";
import React, { useContext, useState } from "react";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import Card from "./components/Card";
import { DataContext } from "./components/context/DataContext";
import { useColorGenerator } from "./hooks/useColorgenerator";
import CustomButton from "./components/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "./api";

const Main = () => {
  const randomWidth = useSharedValue(10);
  const {cardsData,setcardsData} = useContext(DataContext);
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

  const addMarginTop = (index: number) => {
    const zIndex = cardsData.length - index;
    let margin = 0;
    while (cardsData.length > 0) {
      margin = zIndex + index;
    }
    return -margin;
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { name: string };
    index: number;
  }) => {

    const cardslength = cardsData.length;
    const zIndex = cardslength - index;
    const cardheight =
      index > cardslength - 4 && index < cardslength
        ? height - height / 5 + zIndex * 20
        : height - height / 5;
    return (
      <View
        style={{
          zIndex,
          position: "absolute",
          bottom: -330,
          left: -150,
        }}
      >
        <Card name={item.name} height={cardheight} index={index} />
      </View>
    );
  };

  

  const renderCards = () => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#4A154B",
        }}
      >
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          data={cardsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
        <View
          style={{
            marginBottom: 10,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <CustomButton height={60} width={60} icon_name={"close"} />
          <CustomButton height={60} width={60} icon_name={"heart"} />
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderCards()}
    </View>
  );
};

export default Main;
