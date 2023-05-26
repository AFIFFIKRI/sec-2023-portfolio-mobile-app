import { Pressable, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen(props) {
  const Tab = createBottomTabNavigator();
  return (

    // create pressable button on home screen to navigate to snapscreen and recordscreen

    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:'black' }}>
      <Text style={{ fontSize: 35, fontWeight:'500', textTransform: "uppercase", paddingBottom: 200, color:'white' }}>
        My Camera App
      </Text>


      <Pressable
        onPress={() => props.navigation.navigate("Snap")}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: 4,
          backgroundColor: "#841584",
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 4,
          width:250,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Let's Take Picture</Text>
      </Pressable>



      {/* Use pressable is better instead of button */}
      <Pressable
        onPress={() => props.navigation.navigate("Record")}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
          backgroundColor: "blue",
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 4,
          width:250,
        }}
      >
        
        <Text style={{ color: "white", fontSize: 18 }}>Let's Record Video</Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
