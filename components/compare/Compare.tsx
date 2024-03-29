import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const Draggable = () => {
  const { height, width } = useWindowDimensions();
  const translatex = useSharedValue(0);
  const pan_gesture = Gesture.Pan().onChange((e) => {
    translatex.value = translatex.value + e.changeX;
  });

  const draggable_styles = useAnimatedStyle(() => ({
    transform: [{ translateX: translatex.value }],
  }));
  return (
    <GestureDetector gesture={pan_gesture}>
      <Animated.View style={[draggable_styles,{ height: height / 2.4 }, styles.draggable]}></Animated.View>
    </GestureDetector>
  );
};

const Compare = () => {
  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <BlurView intensity={100} style={styles.blurContainer}>
        <Animated.View
          style={[{ width: width - 30, height: height / 2.4 }, styles.card]}
        >
          <Image
            style={styles.image}
            source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
            transition={1000}
          />
          <Draggable />
          <Image
            style={styles.image}
            source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
            transition={1000}
          />
        </Animated.View>
      </BlurView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  blurContainer: {},
  text: {},
  card: {
    flexDirection: "row",
    borderRadius: 50,
  },
  draggable: {
    position: "relative",
    width: 2,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  circle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default Compare;
