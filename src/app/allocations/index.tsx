import { StatusBar } from "expo-status-bar";
import { Link, Stack } from "expo-router";
import { StyleSheet, Button, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { accountsCollection } from "../../db";
import AllocationsList from "../../components/AllocationsList";

export default function HomeScreen() {
  const test = async () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Allocations",
          headerRight: () => (
            <Feather
              name="refresh-cw"
              size={20}
              color="green"
              // onPress={mySync}
            />
          ),
        }}
      />

      <Link href="/allocations/new" asChild>
        <Text style={styles.button}>New Allocation</Text>
      </Link>

      <AllocationsList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "green",
    color: "white",
    margin: 10,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5,
    overflow: "hidden",
  },
});
