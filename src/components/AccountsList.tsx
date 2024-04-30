import { FlatList } from "react-native";
import AccountListItem from "./AccountListItem";
// import { accountsCollection } from '../db';
// import Account from '../model/Account';

// import { withObservables } from '@nozbe/watermelondb/react';

function AccountsList() {
  return (
    <FlatList
      data={[]}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item }) => <AccountListItem />}
    />
  );
}

// const enhance = withObservables([], () => ({
//   accounts: accountsCollection.query(),
// }));

export default AccountsList;
