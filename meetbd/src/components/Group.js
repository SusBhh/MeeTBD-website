import React from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import "../newstyles.css";

const Group = (group) => {
  group = group.group;
  const [userId, setUserId] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const supabase = useSupabaseClient();

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
  };
  getUserId();
  const isOwner = userId === group.owner;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async () => {
    // TODO: edit group name

    handleClose();
  };

  const handleDelete = async () => {
    // TODO: check if delete works
    try {
      const { error } = await supabase
        .from("group")
        .delete() //delete the row
        .eq("id", group.id) //the id of row to delete
        .eq("owner", userId); //check if the item being deleted belongs to the user

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }

    handleClose();
  };

  const handleLeave = async () => {
    // TODO: check if leave works
    try {
      // create members array without curr user
      let members = group.members;
      const index = members.indexOf(userId);
      if (index > -1) {
        members.splice(index);
      }
      console.log(members);

      // update curr group without  member
      const { updateError } = await supabase
        .from("groups")
        .update({ members: members })
        .eq("id", group.id);
      if (updateError) throw updateError;

      if (updateError) throw updateError;
    } catch (error) {
      alert(error.error_description || error.message);
    }

    handleClose();
  };

  const handleCopy = () => {
    // copies join ID
    const copyText = group.id + group.name.toString().replace(/\s/g, "");
    console.log(copyText);
    navigator.clipboard.writeText(copyText);

    handleClose();
  };

  return (
    <div className="group-around">
      <div className="group">
        <div className="text">
          <p>{group.name}</p>
        </div>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit} disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
            {isOwner ? (
              // delete option if owner
              <MenuItem onClick={handleDelete} disableRipple>
                <DeleteIcon />
                Delete
              </MenuItem>
            ) : (
              // leave option if not owner
              <MenuItem onClick={handleLeave} disableRipple>
                <ExitToAppIcon />
                Leave Group
              </MenuItem>
            )}
            <MenuItem onClick={handleCopy} disableRipple>
              <ContentCopyIcon />
              Copy Join ID
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Group;
