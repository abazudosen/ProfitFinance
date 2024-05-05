import { synchronize } from "@nozbe/watermelondb/sync";
import database from "./index";
import { supabase } from "../lib/supabase";
import migrations from "./migrations";

export async function mySync() {
  await synchronize({
    database,
    sendCreatedAsUpdated: true,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const { data, error } = await supabase.rpc("pull", {
        lastPulledAt: lastPulledAt,
        schemaversion: schemaVersion,
        migration: migration,
      });
      console.log(error);
      console.log(JSON.stringify(data));

      return {
        changes: data.changes,
        timestamp: data.timestamp,
      };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("Pushing data");
      // push changes to supabase
      const { error } = await supabase.rpc("push", {
        changes,
        lastPulledAt: lastPulledAt,
      });

      console.log("Error: ", error);
      console.log(changes);
      console.log("Pushing data to cloud");
    },
  });
}
