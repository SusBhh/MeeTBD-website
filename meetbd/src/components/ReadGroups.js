import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Group from "./Group";

const ReadGroups = (readGroups) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  const supabase = useSupabaseClient();

  async function handleDelete(group) {
    console.log(group);
    try {
      const { error } = await supabase
        .from("groups")
        .delete()
        .eq("id", group.id);

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
    readGroups();
  };

  async function readGroups() {
    // set isLoading to true
    setIsLoading(true);

    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // read groups
    const { error, data } = await supabase
      .from("groups") //the table you want to work with
      .select("id, name, owner, members") // columns to select from the database
      .contains("members", [user?.id]) // match only groups where user is a member
      .order("id", { ascending: false }); // sort the data so the last item comes on top;

    if (error) throw error; // check if there was an error fetching the data and move the execution to the catch block
    if (data) setGroups(data);

    setIsLoading(false);
  }

  React.useEffect(() => {
    readGroups();
  }, []);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : groups.length == 0 ? (
        <p>No groups to display</p>
      ) : (
        <div>
          {groups.map((group, i) => (
            <Group key={group.id} group={group} handleDelete={handleDelete}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadGroups;
