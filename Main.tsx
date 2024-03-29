import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import Compare from "./components/compare/Compare";
import { cardsList } from "./DataStore";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import Card from "./components/Card";
import { DataContext } from "./components/context/DataContext";

const Main = () => {
  const randomWidth = useSharedValue(10);
  const cardsData = useContext(DataContext);

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
    console.log("name is ", item);
    const zIndex = cardsData.cardsData.length - index;
    return (
      <View
        style={{
          zIndex,
          // position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card name={item.name} />
      </View>
    );
  };

  const renderCards = () => {
    return (
      <SafeAreaView
        style={{ flex: 1, position: "relative", backgroundColor: "#4A154B" }}
      >
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
          }}
          data={cardsData.cardsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    );
  };
  return renderCards();
};

export default Main;
