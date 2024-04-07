import { GestureHandlerRootView } from "react-native-gesture-handler";
import Main from "./Main";
import { DataContextprovider } from "./components/context/DataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AnimatedStyleUpdateExample(props) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DataContextprovider>
          <Main />
        </DataContextprovider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
