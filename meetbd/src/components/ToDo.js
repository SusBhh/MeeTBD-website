import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { blue } from '@mui/material/colors';
function ToDo(props) {
    return (
        <li className="todo stack-small">
            <div className="c-cb">
                <Checkbox id={props.id} defaultChecked={props.completed} size="large" />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>

            <div className="btn-group">
                <Button type="Button" className="btn">
                    Edit {props.name}
                </Button>
                <Button type="Button" className="btn btn__danger">
                    Delete {props.name}
                </Button>
            </div>
        </li>
    );
}

export default ToDo;
