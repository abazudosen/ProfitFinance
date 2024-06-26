import { Stack, router } from "expo-router";
import { useState } from "react";
import { withObservables } from "@nozbe/watermelondb/react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import database, {
  accountAllocationCollection,
  accountsCollection,
  allocationsCollection,
} from "../../../db";
import Account from "../../../model/Account";
import { useAuth } from "../../../providers/AuthProviders";

function NewAllocation({ accounts }: { accounts: Account[] }) {
  const [income, setIncome] = useState("0");

  const { user } = useAuth();

  const save = async () => {
    await database.write(async () => {
      const allocation = await allocationsCollection.create((newAllocation) => {
        newAllocation.income = Number.parseFloat(income);
        newAllocation.userId = user?.id;
      });
      await Promise.all(
        accounts.map((account) =>
          accountAllocationCollection.create((item) => {
            item.account.set(account);
            item.allocation.set(allocation);
            item.cap = account.cap;
            item.amount = (allocation.income * account.cap) / 100;
            item.userId = user?.id;
          })
        )
      );
    });

    setIncome("");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "New Allocation" }} />

      <View style={styles.inputRow}>
        <Text style={styles.label}>Income</Text>
        <TextInput
          value={income}
          onChangeText={setIncome}
          placeholder="$123"
          style={styles.input}
        />
      </View>

      {accounts.map((account) => (
        <View key={account.id} style={styles.inputRow}>
          <Text style={{ flex: 1 }}>
            {account.name}: {account.cap}%
          </Text>
          <Text>${(Number.parseFloat(income) * account.cap) / 100}</Text>
        </View>
      ))}

      <Button title="Save" onPress={save} />
    </View>
  );
}

const enhance = withObservables([], () => ({
  accounts: accountsCollection.query(),
}));

export default enhance(NewAllocation);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  label: {
    fontWeight: "bold",
    width: 100,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
});
