import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Button,
  Platform,
  Vibration,
} from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
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
import LottieView from "lottie-react-native";
import { useColorGenerator } from "../hooks/useColorgenerator";
import { Image } from "expo-image";
import { vibrate } from "../utils/nail_hammer";

const Card = (props: {
  item: any;
  height: number;
  filterCardData: (name: string) => void;
}) => {
  const { cardsData, setcardsData } = useContext(DataContext);
  const { width } = useWindowDimensions();
  const scale = useSharedValue<number>(1);
  const hide = useSharedValue<boolean>(false);
  const translatex = useSharedValue<number>(0);
  const translatey = useSharedValue<number>(0);

  const longtap_gesture = Gesture.LongPress()
    .onTouchesDown(() => {
      scale.value = scale.value * 0.92;
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

  const deleteCard = (name: string) => {
    props.filterCardData(name);
    vibrate();
  };

  const pan_gesture = Gesture.Pan()
    .onBegin((e) => {})
    .onChange((e) => {
      console.log("THIS IS THE VALUE", translatex.value + e.changeX);
      translatex.value = translatex.value + e.changeX;
      translatey.value = translatey.value + e.changeY;
      let relativeX = translatex.value + e.changeX;
      let relativeY = translatey.value + e.changeX;
      if (relativeX < -190 || relativeY < -100) {
        translatex.value = withSpring(relativeX + 50);
        runOnJS(deleteCard)(props.item.name);
      }
      if (relativeX > 190 || relativeY > 100) {
        translatex.value = withSpring(relativeX + 50);
        runOnJS(deleteCard)(props.item.name);
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
    // backgroundColor: interpolateColor(props.index, [0, 20], [color, color]),
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
  console.log("fucking rerendering");
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const composed = Gesture.Simultaneous(pan_gesture, longtap_gesture); //Here
  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        entering={BounceInDown}
        style={[
          styles.card_container,
          {
            height: props.height,
            width: width - 60,
          },
          card_styles,
        ]}
      >
        <Image
          style={[styles.image, { height: props.height, width: width - 60 }]}
          source={props.item.flickr_images[1] ?? props.item.flickr_images[0]}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <Animated.View
          style={[
            {
              height: 220,
              width: 220,
              flexDirection: "row",
              top: 80,
              left: 1,
              borderRadius: 20,
              position: "absolute",
              zIndex: 1000,
            },
            leftcard,
          ]}
        >
          <LottieView
            autoPlay
            style={{
              width: 220,
              height: 220,
            }}
            source={require("../assets/lotties/like.json")}
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              height: 220,
              width: 220,
              flexDirection: "row",
              top: 80,
              right: 1,
              borderRadius: 20,
              position: "absolute",
              zIndex: 1000,
            },
            rightcard,
          ]}
        >
          <LottieView
            autoPlay
            style={{
              width: 220,
              height: 220,
            }}
            source={require("../assets/lotties/nope.json")}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  card_container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "relative",
  },
  image: {
    flex: 1,
    borderRadius: 30,
  },
});
