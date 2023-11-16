import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Group from "./Group";

const ReadGroups = () => {
  const [groups, setGroups] = React.useState([
    {
      id: 10,
      name: "hello3",
      owner: "1a415398-aff6-4b23-9587-8067f10796bc",
      members: ["1a415398-aff6-4b23-9587-8067f10796bc"],
    },
    {
      id: 12,
      name: "hello2",
      owner: "1a415398-aff6-4b23-9587-8067f10796bc",
      members: ["1a415398-aff6-4b23-9587-8067f10796bc"],
    },
  ]);

  const supabase = useSupabaseClient();

  async function readGroups() {
    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // TODO: read groups
    const { error, data } = await supabase
      .from("groups") //the table you want to work with
      .select("id, name, owner, members") // columns to select from the database
      .in("members", user?.id) // match only groups where user is a member
      .order("id", { ascending: false }); // sort the data so the last item comes on top;
    if (error) throw error; // check if there was an error fetching the data and move the execution to the catch block
    if (data) setGroups(data);
    console.log(groups);
  }

  return (
    <div>
      {groups.length == 0 ? (
        <p>No groups to display</p>
      ) : (
        <div>
          {groups.map((group, i) => (
            <Group group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadGroups;
