import { Redirect, Slot, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../providers/AuthProviders";

const TabsLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="allocations"
        options={{
          title: "Allocations",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-tree" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="account-balance-wallet"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen name="index" options={{ href: null }} /> */}
    </Tabs>
  );
};

export default TabsLayout;
