import React from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

const ToDo = (props) => {
    const filter = props.filter;

    return (
        <li className="todo stack-small">
            {filter === props.completed || filter == null ? (
                <div className="c-cb">
                    <Checkbox id={props.id} defaultChecked={props.completed} size="large" onClick={() => props.handleComplete(props.item)} />
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>
                    <Tooltip title="delete item" placement="top" arrow>
                        <IconButton
                            onClick={() => props.handleDelete(props.id)}
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
