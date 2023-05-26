// Recording app comprises of using 4 type of expo SDK
// expo-camera - usage of camera
// expo-av - usage of video feature on device
// expo-sharing - usage of sharing video to any social media
// expo-media library - to store content on user device

import {
  Text,
  View,
  Button,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

function RecordScreen() {
  // declare variables before call in function
  let cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  // function for 3 permission
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // boolean for permission
  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }

  // declare variable for recording video using async function to handle promise
  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  // function for toggling camera front and back
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // declare variable for stop recording video
  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  // declaration variable of sharing & save video after video stop recording
  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
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
        <Video
          style={{
            flex: 1,
            alignSelf: "stretch",
          }}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
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

          <Button title="Share" onPress={shareVideo} />
          {hasMediaLibraryPermission ? (
            <Button title="Save" onPress={saveVideo} />
          ) : undefined}
          <Button title="Discard" onPress={() => setVideo(undefined)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera
      style={{
        flex: 6,
        alignItems: "center",
        justifyContent: "center",
      }}
      type={type}
      ref={cameraRef}
    >
      <View
        style={{
          flex: 6,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingLeft: "26.5%",
          marginBottom: 50,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "red" : "white",
              padding: 10,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "grey",
            },
          ]}
          // boolean for onpress for recording state

          onPress={isRecording ? stopRecording : recordVideo}
        >
          <Text style={{ textAlign: "center", padding: 2 }}>
            {isRecording ? "Stop Recording" : "Start recording"}
          </Text>
        </Pressable>

        <TouchableOpacity
          style={{ paddingLeft: 65 }}
          onPress={toggleCameraType}
        >
          <Ionicons name="ios-camera-reverse-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

export default RecordScreen;
