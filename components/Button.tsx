import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { transform } from "typescript";

const CustomButton = ({ height, width, icon_name }) => {
  const scale = useSharedValue(1);

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(scale.value * 2, { duration: 200 });
    })
    .onEnd(() => {
      scale.value = withSpring(scale.value / 2, { duration: 500 });
    });

  const buttonStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const ButtonIcon = React.forwardRef((props, ref) => {
    return <Ionicons name={icon_name} size={36} color="black" {...props} />;
  });

  const AnimatedIcon = Animated.createAnimatedComponent(ButtonIcon);
  return (
    <GestureDetector gesture={tap}>
      <View
        style={{
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
        }}
      >
        <MaskedView
          style={{ flex: 1, flexDirection: "row", height: "100%" }}
          maskElement={
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name={icon_name} size={36} color="black" />
            </View>
          }
        >
          <LinearGradient
            colors={["#F7C650", "rgba(247, 198, 80, 0.71)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
    </GestureDetector>
  );
};

export default CustomButton;
