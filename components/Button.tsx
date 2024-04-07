import { Easing, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  BounceInDown,
  ReduceMotion,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { DataContext } from "./context/DataContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "../api";
import { vibrate } from "../utils/nail_hammer";
import { cardsList } from "../DataStore";
const config = {
  mass: 1,
  damping: 10,
  stiffness: 100,
  overshootClamping: true,
  restDisplacementThreshold: 0.05,
  // restSpeedThreshold: 2,
  reduceMotion: ReduceMotion.System,
};
const CustomButton = ({ height, width, icon_name, filterCardData }) => {
  const scale = useSharedValue(1);
  // const query = useQuery({ queryKey: ["rockets"], queryFn: fetchAllShips });
  const { cardsData, setcardsData, translatex } = useContext(DataContext);

  console.log("running");
  const deleteCard = () => {
    filterCardData();
    vibrate();
  };

  const refresh = () => {
    // if (query.data) {
    setcardsData(cardsList);
    vibrate();
    // }
  };
  const tap_gesture = Gesture.Tap()
    .onBegin(() => {})
    .onTouchesDown(() => {
      scale.value = withSpring(1.4, config);
    })
    .onTouchesUp(() => {
      scale.value = withTiming(1);
      {
        icon_name === "refresh-outline"
          ? runOnJS(refresh)()
          : runOnJS(deleteCard)();
      }
    });

  const pan_gesture = Gesture.Pan()
    .onChange((e) => {})
    .onEnd(() => {
      scale.value = 1;
    });

  const buttonScaleStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translatex.value,
          [-500, 0, 500],
          [1.6, 1, 1.6]
        ),
      },
    ],
  }));
  const buttonStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const ButtonIcon = React.forwardRef((props, ref) => {
    return <Ionicons name={icon_name} size={36} color="black" />;
  });

  const AnimatedIcon = Animated.createAnimatedComponent(ButtonIcon);
  const combined = Gesture.Exclusive(pan_gesture, tap_gesture);
  return (
    <GestureDetector gesture={combined}>
      <Animated.View
        entering={BounceInDown}
        style={[
          {
            height: height,
            backgroundColor: "white",
            width: width,
            borderRadius: 50,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
          },
          buttonStyles,
          buttonScaleStyles,
        ]}
      >
        <MaskedView
          androidRenderingMode="software"
          style={{ flex: 1, flexDirection: "row", height: "100%" }}
          maskElement={
            <View
              key={icon_name}
              style={[
                {
                  backgroundColor: "transparent",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              {icon_name ? <AnimatedIcon /> : null}
            </View>
          }
        >
          <LinearGradient
            colors={[
              "#FF0018",
              "#FF0018",
              "#FFA52C",
              "#FFFF41",
              "#008018",
              "#0000F9",
              "#86007D",
              "#FF0018",
            ]}
            style={{ flex: 1, transform: [{ rotateZ: "180deg" }] }}
          />
        </MaskedView>
      </Animated.View>
    </GestureDetector>
  );
};

export default CustomButton;
