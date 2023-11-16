import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton, Tooltip } from "@mui/material";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import "../newstyles.css";

const Group = (group) => {
  group = group.group;
  const [userId, setUserId] = React.useState(null);

  const supabase = useSupabaseClient();

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
  };
  getUserId();
  const isOwner = userId === group.owner;

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
    // copies join code
    const copyText = group.id + group.name.toString().replace(/\s/g, "");
    console.log(copyText);
    navigator.clipboard.writeText(copyText);

    alert("successfully copied join code!");
    handleClose();
  };

  // TODO: add tooltips
  return (
    <div className="group-around">
      <div className="group">
        <div className="text">
          <p>{group.name}</p>
        </div>
        <Tooltip title="copy join code" placement="top" arrow>
          <IconButton onClick={handleCopy} disableRipple>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="edit group" placement="top" arrow>
          <IconButton onClick={handleEdit} disableRipple>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {isOwner ? (
          // delete option if owner
          <Tooltip title="delete group" placement="top" arrow>
            <IconButton onClick={handleDelete} disableRipple>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          // leave option if not owner
          <Tooltip title="leave group" placement="top" arrow>
            <IconButton onClick={handleLeave} disableRipple>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Group;
