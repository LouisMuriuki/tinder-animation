import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Button,
} from "react-native";
import React from "react";
import Animated, {
  BounceInDown,
  BounceInUp,
  BounceOutUp,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const Card = () => {
  const { width, height } = useWindowDimensions();

  const scale = useSharedValue<number>(1);
  const hide = useSharedValue<boolean>(false);
  const translatex = useSharedValue<number>(0);
  const translatey = useSharedValue<number>(0);

  const longtap_gesture = Gesture.LongPress()
    .onTouchesDown(() => {
      scale.value = scale.value * 0.98;
    })
    .onTouchesUp(() => {
      scale.value = 1;
    });
  const tap_gesture = Gesture.Tap()
    .onTouchesDown(() => {
      hide.value = true;
    })
    .onTouchesUp(() => {
      hide.value = false;
    });

  const pan_gesture = Gesture.Pan()
    .onBegin((e) => {
      // translate.value = translate.value + e.absoluteX / 3 ;
    })
    .onChange((e) => {
      console.log("THIS IS THE VALUE", translatex.value + e.absoluteX / 360);
      translatex.value = translatex.value + e.changeX;
      translatey.value = translatey.value + e.changeY;
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
        skewY: `${interpolate(
          translatex.value,
          [-900, 50, 800],
          [180, 0, 180]
        )}deg`,
      },
      {
        rotateY: `${interpolate(
          translatex.value,
          [-500, 0, 500],
          [-360, 0, 360]
        )}deg`,
      },
    ],
    backgroundColor: interpolateColor(
      translatey.value,
      [-500, 0, 500],
      ["#38deee", "#d9064b", "#309e24"]
    ),
  }));

  const handlePress = () => {
    hide.value = false;
  };

  const composed = Gesture.Simultaneous(pan_gesture, longtap_gesture); //Here
  return (
    <GestureDetector gesture={pan_gesture}>
      <Animated.View
        entering={BounceInDown}
        style={[
          styles.card_container,
          { height: height - height / 5, width: width - 60 },
          card_styles,
        ]}
      >
        <Text>#1</Text>
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
  },
});
