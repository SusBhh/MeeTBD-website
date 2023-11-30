import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import ReactDOM from "react-dom/client";

const ProfilePage = () => {
  const [profile, setProfile] = React.useState(null);
  const [displayName, setDisplayName] = useState("");
  const supabase = useSupabaseClient();

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: memberData, error: memberError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id);
    setProfile(memberData[0]);
    setDisplayName(memberData[0].display_name);
  };
  getProfile();

  async function insertDisplayName() {
    const { data, error } = await supabase
      .from("profile")
      .update({ display_name: displayName })
      .eq("id", profile.id)
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
          <form onSubmit={handleSubmit}>
            <label>
              Change Display Name:{" "}
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />{" "}
            </label>
            <input type="submit" />
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
