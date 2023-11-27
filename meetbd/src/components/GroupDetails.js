import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Portal } from "@mui/base/Portal";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";

import ReadEvents from "./ReadEvents";

const GroupDetails = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { groupId } = useParams();
  const [anchor, setAnchor] = React.useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [userId, setUserId] = React.useState(null);
  const [isOwner, setIsOwner] = React.useState(false);
  const [group, setGroup] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [events, setEvents] = useState(null);
  const [members, setMembers] = useState([]);

  const supabase = useSupabaseClient();

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchor(false);
  };

  const handleEdit = async () => {
    setGroupName(group.name);
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update groupName in db
    const { error } = await supabase
      .from("groups")
      .update({ name: groupName })
      .eq("id", group.id);
    if (error) throw error;

    // update group's groupName
    let data = group;
    data.name = groupName;
    setGroup(data);

    setIsEditing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchGroup = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // get group data
        const { data: groupData, groupError } = await supabase
          .from("groups")
          .select("*")
          .eq("id", groupId)
          .single();
        if (groupError) {
          throw groupError;
        }
        setGroup(groupData);
        setGroupName(groupData.name);
        setIsOwner(user.id === groupData.owner);

        // get events data
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("group_id", groupId);
        if (eventError) {
          throw eventError;
        }
        setEvents(eventData);

        // get member data
        const { data: memberData, error: memberError } = await supabase
          .from("profile")
          .select("*")
          .in("id", [groupData.members]);
        if (memberError) {
          throw memberError;
        }
        setMembers(memberData);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchGroup();
    setIsLoading(false);
  }, [groupId, supabase]);

  const open = Boolean(anchor);
  const id = open ? "simple-popup" : undefined;
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const PopupBody = styled("div")(
    ({ theme }) => `
        width: 500px;
        padding: 12px 16px;
        margin: 8px;
        border-radius: 8px;
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        background-color: ${theme.palette.mode === "dark" ? grey[900] : "#FFF"};
        box-shadow: ${
          theme.palette.mode === "dark"
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        font-size: 0.875rem;
        z-index: 1;
        `
  );

  return (
    <div>
      {group ? (
        <div>
          <div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  id="groupNameInput"
                  class="groupName"
                  type="text"
                  value={groupName}
                  onChange={handleChange}
                />
              </form>
            ) : (
              <h1 class="groupName">{groupName}</h1>
            )}
            {isOwner && (
              <Tooltip title="edit group name" placement="top" arrow>
                <IconButton
                  id="groupNameEdit"
                  onClick={handleEdit}
                  disableRipple
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <h2>Group Members</h2>
          {members.map((member, i) => (
            <div className="groupMember">
              <p>{member.display_name}</p>
            </div>
          ))}
          <Grid container justifyContent="center" spacing={1}>
            {/*     <ClickAwayListener onClickAway={handleClickAway}>*/}
            <div>
              <Button
                aria-describedby={id}
                type="button"
                onClick={handleClick}
                size="small"
                variant="outlined"
                color="secondary"
              >
                Schedule Event
              </Button>
              {open ? (
                <Portal>
                  <BasePopup id={id} open={open} anchor={anchor}>
                    <PopupBody>
                      <CreateEvent
                        groupId={groupId}
                        onClose={handleClickAway}
                      />
                    </PopupBody>
                  </BasePopup>
                </Portal>
              ) : null}
            </div>
            {/*            </ClickAwayListener>*/}
          </Grid>
          <h2>Scheduled Events:</h2>
          <h3>Pending Events:</h3>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <ReadEvents groupId={groupId} />
            </div>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GroupDetails;
