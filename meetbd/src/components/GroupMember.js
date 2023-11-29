import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

const GroupMember = ({ handleDelete, member, isOwner, isSelf }) => {
  console.log(member);
  return (
    <div className="group-around">
      <div className="groupMember">
        <p>{member.display_name}</p>
        {isOwner && !isSelf && (
          <Tooltip title="delete group" placement="top" arrow>
            <IconButton
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you wish to remove member: " +
                      member.display_name +
                      "? They will have to rejoin the group."
                  )
                )
                  handleDelete(member.id);
              }}
              disableRipple
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default GroupMember;
