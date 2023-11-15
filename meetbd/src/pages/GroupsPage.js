import React from "react";
import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import ReadGroups from "../components/ReadGroups";

import "../newstyles.css";

const GroupsPage = () => {
  const [groupName, setGroupName] = React.useState("");
  const [joinID, setJoinID] = React.useState("");

  // TODO: join by ID
  // const updateItem = async ({ item, id }) => {
  //     setLoading(true);
  //     try {
  //       const user = supabase.auth.user();

  //       const { error } = await supabase
  //         .from("todo")
  //         .update({ item })
  //         .eq("userId", user?.id)
  //         .eq("id", id); //matching id of row to update

  //       if (error) throw error;

  //       await getActiveItems();
  //     } catch (error) {
  //       alert(error.error_description || error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const supabase = useSupabaseClient();

  async function handleCreateGroup(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson["groupName"] === "") {
      // return early if groupName is empty
      return;
    }

    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // insert group into db
    await supabase.from("groups").insert({
      name: formJson["groupName"],
      owner: user?.id,
      members: [user?.id],
    });

    alert("Successfully created group " + groupName + "!");

    setGroupName("");
  }

  return (
    <div>
      <h1>Groups Page</h1>
      <div>
        {/* list groups here */}
        <ReadGroups />
      </div>
      <div className="bottom">
        <div className="add-group">
          {/* add groups here */}
          <h2>Join an Existing Group by ID</h2>
          <form>
            <label>
              <input
                type="text"
                name="joinID"
                onChange={(e) => setJoinID(e.target.value)}
              />
            </label>
            {joinID.length == 0 ? (
              <Button type="submit" variant="contained" size="small" disabled>
                Join
              </Button>
            ) : (
              <Button type="submit" variant="contained" size="small">
                Join
              </Button>
            )}
          </form>
          <h2>Create a New Group</h2>
          {/* <CreateGroup /> */}
          <form onSubmit={handleCreateGroup}>
            <label>
              <input
                type="text"
                value={groupName}
                name="groupName"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </label>
            {groupName.length == 0 ? (
              <Button type="submit" variant="contained" size="small" disabled>
                Create
              </Button>
            ) : (
              <Button type="submit" variant="contained" size="small">
                Create
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
