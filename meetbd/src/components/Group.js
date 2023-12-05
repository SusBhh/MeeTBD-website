import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

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

  const handleCopy = () => {
    // copies join code
    const copyText = group.id + group.name.toString().replace(/\s/g, "");
    navigator.clipboard.writeText(copyText);

    alert("successfully copied join code!");
  };

  const handleGroupClick = (event) => {
    const target = event.target;
    if (!target.closest("button")) {
      window.location.href = `/groups/${group.id}`;
    }
  };

  return (
    <div className="group-around" onClick={handleGroupClick}>
      <Link to={`/groups/${group.id}`} onClick={(e) => e.preventDefault()}>
        <div className="group">
          <div className="text">
            <p>{group.name}</p>
          </div>
          <Tooltip title="copy join code" placement="top" arrow>
            <IconButton onClick={handleCopy} disableRipple>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          {isOwner ? (
            // delete option if owner
            <Tooltip title="delete group" placement="top" arrow>
              <IconButton
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you wish to delete group: " +
                        group.name +
                        "? This action cannot be undone."
                    )
                  )
                    props.handleDelete(group);
                }}
                disableRipple
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            // leave option if not owner
            <Tooltip title="leave group" placement="top" arrow>
              <IconButton
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you wish to leave group: " +
                        group.name +
                        "?"
                    )
                  )
                    props.handleLeave(group);
                }}
                disableRipple
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Group;
