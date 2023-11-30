import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  const [displayName, setDisplayName] = useState("");
  const supabase = useSupabaseClient();

  const getProfile = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserID(user.id);

    const { data: memberData, error: memberError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id);
    if (memberError) throw memberError;
    setDisplayName(memberData[0].display_name);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getProfile();
  }, [supabase]);

  async function insertDisplayName() {
    const { data, error } = await supabase
      .from("profile")
      .update({ display_name: displayName })
      .eq("id", userID)
      .single();
    if (error) {
      console.error("Error changing display name:", error.message);
    } else {
      console.log("Display name changed successfully:", data);
    }
  }

  const handleSubmit = (event) => {
    if (displayName) {
      event.preventDefault();
      alert(`Display was changed successfully to ${displayName}`);
      insertDisplayName();
    }
    if (!displayName) {
      alert(`Display name cannot be empty`);
    }
  };

  return (
    <Container>
      <Grid container spacing={5} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Change Display Name:{" "}
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />{" "}
              </label>
              <Button type="submit" variant="contained" size="small">
                Submit
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
