import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/Home";
import SnapScreen from "./screens/Snap";
import RecordScreen from "./screens/Record";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (

    // create bottom tab navigation and react navigation to navigate between screens
    
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "orangered",
        tabBarInactiveBackgroundColor: "dimgrey",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Snap"
        component={SnapScreen}
        options={{
          headerBackgroundContainerStyle:'blue',        
          tabBarLabel: "Snap",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarLabel: "Record",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
}

export default App;
