import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  Button,
  Vibration,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

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
  const { cardsData, setcardsData } = useContext(DataContext);
  const query = useQuery({ queryKey: ["rockets"], queryFn: fetchAllShips });

  useEffect(() => {
    setcardsData(query.data);
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
        <Card item={item} height={cardheight} index={index} />
      </View>
    );
  };

  const FlatlistComponent = () => {
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
          {cardsData && cardsData?.length > 0 ? null : (
            <CustomButton
              height={60}
              width={60}
              icon_name={"refresh-outline"}
            />
          )}
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
      <FlatlistComponent />
    </View>
  );
};

export default Main;
