import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ReadGroups from "../components/ReadGroups";

import "../newstyles.css";

const GroupsPage = () => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");
  const [joinCode, setJoinCode] = React.useState("");

  const supabase = useSupabaseClient();

  async function handleJoinGroup(e) {
    setIsLoading(true);
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson["joinCode"] === "") {
      // return early if groupName is empty
      setIsLoading(false);
      return;
    }

    // break up join code (groupID + groupName, no spaces)
    const currGroupID = formJson["joinCode"].match(/\d+/g)[0];
    const currGroupNameSquish = formJson["joinCode"].substring(
      currGroupID.length
    );

    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // read curr group's members + name based on id
    const { readError, data } = await supabase
      .from("groups")
      .select("name, members")
      .eq("id", currGroupID);
    if (readError) throw readError;

    // get curr group's members + name
    let members = [];
    let currGroupName = "";
    if (data && data.length > 0) {
      members = data[0]["members"];
      currGroupName = data[0]["name"];
    } else {
      alert("There is no group with that join code.");
      setIsLoading(false);
      return;
    }

    // check that the group names match
    if (
      currGroupNameSquish.replace(/\s/g, "") !== currGroupName.replace(/\s/g, "")
    ) {
      alert("There is no group with that join code.");
      setIsLoading(false);
      return;
    }

    // check if user is already member of group
    if (members.includes(user?.id)) {
      alert("You are already a member of this group!");
      setJoinCode("");
      setIsLoading(false);
      return;
    }

    // append user id to members
    members.push(user?.id);

    // update curr group with additional member
    const { updateError } = await supabase
      .from("groups")
      .update({ members: members })
      .eq("id", currGroupID);
    if (updateError) throw updateError;

    alert("Successfully joined group " + currGroupName + "!");

    setJoinCode("");

    setIsLoading(false);
    forceUpdate();
  }

  async function handleCreateGroup(e) {
    setIsLoading(true);
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson["groupName"] === "") {
      // return early if groupName is empty
      setIsLoading(false);
      return;
    }
    // prevent number from starting groupname
    if (!isNaN(formJson["groupName"][0])) {
      alert("Group name cannot start with a number.");
      setGroupName("");
      setIsLoading(false);
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

    setIsLoading(false);
    forceUpdate();
  }

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <h1>Groups Page</h1>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <ReadGroups />
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: 5 }}>
          <div className="add-group">
            <h2>Join an Existing Group by Code</h2>
            <form onSubmit={handleJoinGroup}>
              <label>
                <input
                  type="text"
                  name="joinCode"
                  onChange={(e) => setJoinCode(e.target.value)}
                />
              </label>
              {joinCode.length === 0 ? (
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
            <form onSubmit={handleCreateGroup}>
              <label>
                <input
                  type="text"
                  value={groupName}
                  name="groupName"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </label>
              {groupName.length === 0 ? (
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupsPage;
