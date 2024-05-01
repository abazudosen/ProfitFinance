import { FlatList } from "react-native";
import AccountListItem from "./AccountListItem";
import { accountsCollection } from "../db";
// import Account from '../model/Account';

import { withObservables } from "@nozbe/watermelondb/react";
import Account from "../model/Account";

function AccountsList({ accounts }: { accounts: Account[] }) {
  return (
    <FlatList
      data={accounts}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item }) => <AccountListItem account={item} />}
    />
  );
}

export default withObservables([], () => ({
  accounts: accountsCollection.query(),
}))(AccountsList);
