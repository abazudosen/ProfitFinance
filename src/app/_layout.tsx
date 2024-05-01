import { Redirect, Slot } from "expo-router";
import AuthProvider from "../providers/AuthProviders";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
