import React, { useState } from 'react';
import ToDo from '../components/ToDo';
import '../components/ToDo.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ReadToDo from '../components/ReadToDo';
import CircularProgress from "@mui/material/CircularProgress";

const ToDoPage = ({ }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [itemName, setItemName] = useState('');
    const [completed, setCompleted] = useState(false);
    const [userId, setUserId] = useState('');

    const supabase = useSupabaseClient();

    const getUserId = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();

    async function handleCreateToDo(e) {
        // TODO: make this faster, super slow rn
        setIsLoading(true);
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (formJson["itemName"] === "") {
            alert('Please fill in the event name.');
            return;
        }

        setCompleted(false)
        // insert item into db
        try {
            await supabase.from("todos").insert({
                name: formJson["itemName"],
                owner: userId,
                completed: completed,
            });
            alert("Successfully created todo item " + itemName + "!");
        }
        catch (error) {
            console.error('Error creating event:', error);
            // Handle error scenarios (e.g., show an error message)
        }

        setItemName("");

        setIsLoading(false);
        window.location.reload();
    }

    return (
        <div className="todoapp stack-large">
            <h1>To-Do List</h1>
            <form onSubmit={handleCreateToDo}>
                <label>
                    <input
                        type="text"
                        value={itemName}
                        name="itemName"
                        placeholder="Input an item"
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                {itemName.length == 0 ? (
                    <Button type="submit" variant="contained" size="small" disabled>
                        Add
                    </Button>
                ) : (
                    <Button type="submit" variant="contained" size="small">
                        Add
                    </Button>
                )}
            </form>
            {/* <div className="filters btn-group stack-exception">
                <Button className="btn toggle-btn" aria-pressed="true">
                    Show All Tasks
                </Button>
                <Button className="btn toggle-btn" aria-pressed="false">
                    Show Active Tasks
                </Button>
                <Button className="btn toggle-btn" aria-pressed="false">
                    Show Completed Tasks
                </Button>
            </div> */}
            <h2 id="list-heading">All Tasks</h2>
            {/* <ToDo name="Eat" completed={true} id="todo-0" />
            <ToDo name="Sleep" completed={false} id="todo-1" />
            <ToDo name="Code" completed={false} id="todo-2" /> */}
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div>
                    <ReadToDo />
                </div>
            )}

        </div>
    );
}
export default ToDoPage;

