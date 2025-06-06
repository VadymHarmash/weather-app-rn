import { Provider } from "react-redux";
import { store } from "@/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherScreen from "@/screens/WeatherScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "@firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Weather" component={WeatherScreen} />
        ) : (
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        )}
      </Stack.Navigator>
    </Provider>
  );
}
