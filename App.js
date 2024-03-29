import { GestureHandlerRootView } from "react-native-gesture-handler";
import Main from "./Main";
import { DataContextprovider } from "./components/context/DataContext";

export default function AnimatedStyleUpdateExample(props) {
  return (
    <DataContextprovider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Main />
      </GestureHandlerRootView>
    </DataContextprovider>
  );
}
