import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Button,
  Platform,
  Vibration,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Animated, {
  BounceInDown,
  BounceInUp,
  BounceOutUp,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DataContext } from "./context/DataContext";
import * as Haptics from "expo-haptics";

const Card = (props: { name: string }) => {
  const { width, height } = useWindowDimensions();
  const scale = useSharedValue<number>(1);
  const hide = useSharedValue<boolean>(false);
  const translatex = useSharedValue<number>(0);
  const translatey = useSharedValue<number>(0);

  const { setcardsData, cardsData } = useContext(DataContext);

  const longtap_gesture = Gesture.LongPress()
    .onTouchesDown(() => {
      scale.value = scale.value * 0.98;
    })
    .onTouchesUp(() => {
      scale.value = 1;
    })
    .onFinalize(() => {
      scale.value = 1;
    });
  const tap_gesture = Gesture.Tap()
    .onTouchesDown(() => {
      hide.value = true;
    })
    .onTouchesUp(() => {
      hide.value = false;
    });

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, []);

  const filterCardData = () => {
    const filteredCards = cardsData?.filter((pre) => pre.name !== props.name);
    setcardsData(filteredCards);
  };

  const vibrate = () => {
    Vibration.vibrate(20, false);
  };
  const deleteCard = () => {
    filterCardData();
    vibrate();
  };

  const pan_gesture = Gesture.Pan()
    .onBegin((e) => {
     
    })
    .onChange((e) => {
      console.log("THIS IS THE VALUE", translatex.value + e.changeX);
      translatex.value = translatex.value + e.changeX;
      translatey.value = translatey.value + e.changeY;
      let relativeX = translatex.value + e.changeX;
      let relativeY = translatey.value + e.changeX;
      if (relativeX < -175 || relativeY < -100) {
        translatex.value = withSpring(relativeX + 50);
        runOnJS(deleteCard)();
      }
      if (relativeX > 175 || relativeY > 100) {
        translatex.value = withSpring(relativeX + 50);
        runOnJS(deleteCard)();
      }
    })
    .onFinalize(() => {
      translatex.value = withSpring(0);
      translatey.value = withSpring(0);
    });

  const textStyles = useAnimatedStyle(() => ({
    fontSize: withSpring(hide.value ? 20 : 16),
  }));

  const card_styles = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value) },
      { translateX: translatex.value },
      { translateY: translatey.value },
      {
        rotateY: `${interpolate(
          translatex.value,
          [-500, 0, 500],
          [-100, 0, 100]
        )}deg`,
      },
      {
        rotateX: `${interpolate(
          translatex.value,
          [-500, 0, 500],
          [30, 0, 30]
        )}deg`,
      },
    ],
    opacity: interpolate(translatey.value, [-500, 0, 500], [0, 1, 0]),
    backgroundColor: interpolateColor(
      translatex.value,
      [-500, 0, 500],
      ["#38deee", "#d9064b", "#309e24"]
    ),
  }));

  const leftcard = useAnimatedStyle(() => ({
    opacity: interpolate(translatex.value, [0, 40, 80], [0, 0, 1]),
  }));
  const rightcard = useAnimatedStyle(() => ({
    opacity: interpolate(translatex.value, [-80, -40, 0], [1, 0, 0]),
  }));

  const handlePress = () => {
    hide.value = false;
  };

  const composed = Gesture.Simultaneous(pan_gesture, longtap_gesture); //Here
  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        entering={BounceInDown}
        style={[
          styles.card_container,
          { height: height - height / 5, width: width - 60 },
          card_styles,
        ]}
      >
        <Text>{props.name}</Text>
        <Animated.View
          style={[
            {
              height: 120,
              width: 120,
              flexDirection: "row",
              top: 80,
              left: 40,
              backgroundColor: "blue",
              borderRadius: 20,
              position: "absolute",
              zIndex: 1000,
            },
            leftcard,
          ]}
        >
          <Text>left</Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              height: 120,
              width: 120,
              flexDirection: "row",
              top: 80,
              right: 40,
              backgroundColor: "blue",
              borderRadius: 20,
              position: "absolute",
              zIndex: 1000,
            },
            rightcard,
          ]}
        >
          <Text>right</Text>
        </Animated.View>
      </Animated.View>

      {/* <View>
        <Animated.Text style={textStyles}>*****</Animated.Text>
        <GestureDetector gesture={tap_gesture}>
          <Animated.View
            style={{
              height: 40,
              width: 70,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
              borderRadius: 20,
            }}
          >
            <Text>Press me</Text>
          </Animated.View>
        </GestureDetector>
      </View> */}
    </GestureDetector>
  );
};

export default Card;

const styles = StyleSheet.create({
  card_container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "yellow",
    position: "relative",
  },
});
