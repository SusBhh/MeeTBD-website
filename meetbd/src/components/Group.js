import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton, Tooltip } from "@mui/material";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import "../newstyles.css";

const Group = (props) => {
  const group = props.group;
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
  };

  const handleCopy = () => {
    // copies join code
    const copyText = group.id + group.name.toString().replace(/\s/g, "");
    navigator.clipboard.writeText(copyText);

    alert("successfully copied join code!");
  };

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
            <IconButton onClick={() => props.handleDelete(group)} disableRipple>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          // leave option if not owner
          <Tooltip title="leave group" placement="top" arrow>
            <IconButton onClick={() => props.handleLeave(group)} disableRipple>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Group;
