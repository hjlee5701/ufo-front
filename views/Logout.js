import React from "react";
import { Alert, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Logout({ navigation }) {
  return (
    <View>
      <Text>Logout</Text>
      <Button
        title="탈퇴하기"
        onPress={() => {
          Alert.alert("탈퇴하시겠습니까?", "정말로요?", [
            {
              text: "네!",
              onPress: async () => {
                const SERVER_ADDRESS = await AsyncStorage.getItem(
                  "ServerAddress"
                );
                const UserServerAccessToken = await AsyncStorage.getItem(
                  "UserServerAccessToken"
                );
                await axios({
                  method: "DELETE",
                  url: SERVER_ADDRESS + "/api/member",
                  headers: {
                    Authorization: "Bearer: " + UserServerAccessToken,
                  },
                })
                  .then(() => {
                    navigation.navigate("Login");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                // await AsyncStorage.removeItem("UserServerAccessToken");
                // await AsyncStorage.clear();
              },
            },
            { text: "아니오" },
          ]);
        }}
      />
    </View>
  );
}
