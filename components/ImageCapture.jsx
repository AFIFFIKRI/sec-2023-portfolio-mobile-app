// camera app comprises of using 3 type of expo SDK
// expo-camera - usage of camera
// expo-sharing - usage of sharing video to any social media
// expo-media library - to store content on user device

import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

function ImageCapture() {
  // declare variables before call in function
  let cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  // function for 2 permission
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // boolean for permission
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  // function for toggling camera front and back
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // declare variable for taking picture using async function to handle promise
  // base64 is a form of binary which is uses to transfer data between computer
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  // declaration variable of sharing & save photo after finish snap photo function
  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            alignSelf: "stretch",
            flex: 1,
          }}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            padding: 10,
          }}
        >
          {/* call function upon onpress button */}

          <Button title="Share" onPress={sharePic} />
          {hasMediaLibraryPermission ? (
            <Button title="Save" onPress={savePhoto} />
          ) : undefined}
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera
      style={{ flex: 6, alignItems: "center", justifyContent: "center" }}
      type={type}
      ref={cameraRef}
    >
      <View
        style={{
          flex: 6,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingLeft: "35%",
          marginBottom: 30,
        }}
      >
        {/* call function upon onpress button */}
        <TouchableOpacity
          onPress={takePic}
          style={{
            height: 80,
            width: 80,
            backgroundColor: "white",
            borderRadius: 100,
          }}
        ></TouchableOpacity>

        <TouchableOpacity
          style={{ paddingLeft: 80, marginBottom: 20 }}
          onPress={toggleCameraType}
        >
          <Ionicons name="ios-camera-reverse-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

export default ImageCapture;
