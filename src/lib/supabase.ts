import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nrwwtbscdpptrxkxqnrj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yd3d0YnNjZHBwdHJ4a3hxbnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjExNjIsImV4cCI6MjAzMDEzNzE2Mn0.pnaaqaiZ1E28R0nE0RxKJz0kwQg97UBqh0lP_LbwVRs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
