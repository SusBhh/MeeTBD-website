import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const ToDo = (props) => {
    console.log(props);
    const filter = props.filter;
    // const item = props.item;
    const [userId, setUserId] = useState(null);

    const supabase = useSupabaseClient();

    const getUserId = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();
    // const isOwner = userId === item.owner;


    return (
        <li className="todo stack-small">
            {filter == props.completed || filter == null ? (
                <div className="c-cb">
                    <Checkbox id={props.id} defaultChecked={props.completed} size="large" onClick={() => props.handleComplete(props.item)} />
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>
                    <Tooltip title="delete item" placement="top" arrow>
                        <IconButton
                            onClick={() => props.handleDelete(props.item)}
                            disableRipple
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (<></>)
            }
        </li>
    );
}

export default ToDo;
