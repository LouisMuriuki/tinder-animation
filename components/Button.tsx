import { View } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { DataContext } from "./context/DataContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllShips } from "../api";
import { vibrate } from "../utils/nail_hammer";

const CustomButton = ({ height, width, icon_name }) => {
  const scale = useSharedValue(1);
  const query = useQuery({ queryKey: ["rockets"], queryFn: fetchAllShips });
  const { cardsData, setcardsData } = useContext(DataContext);
  const tap_gesture = Gesture.Tap()
    .onTouchesDown(() => {
      scale.value = withDelay(300, scale.value * 2);
    })
    .onTouchesUp(() => {
      scale.value = 1;
    })
    .onFinalize(() => {
      scale.value = 1;
    });

  const buttonStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const filterCardData = () => {
    const filteredCards = cardsData?.slice(0, -1);
    setcardsData(filteredCards);
  };
  const deleteCard = () => {
    console.log("running");
    filterCardData();
    vibrate();
  };

  const refresh = () => {
    if (query.data) {
      setcardsData(query.data);
      vibrate();
    }
  };
  const ButtonIcon = React.forwardRef((props, ref) => {
    return <Ionicons name={icon_name} size={36} color="black" />;
  });

  const AnimatedIcon = Animated.createAnimatedComponent(ButtonIcon);

  return (
    <GestureDetector gesture={tap_gesture}>
      <Animated.View
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
        ]}
        // onTouchEnd={icon_name === "refresh-outline" ? refresh : deleteCard}
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
              {icon_name ? <AnimatedIcon  /> : null}
            </View>
          }
        >
          <LinearGradient
            colors={["#F7C650", "rgba(247, 198, 80, 0.71)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </Animated.View>
    </GestureDetector>
  );
};

export default CustomButton;
