import React, { useState } from 'react';
import ToDo from '../components/ToDo';
import '../components/ToDo.css';
import Button from "@mui/material/Button";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ReadToDo from '../components/ReadToDo';
import CircularProgress from "@mui/material/CircularProgress";

const ToDoPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [itemName, setItemName] = useState('');
    const [completed, setCompleted] = useState(false);
    const [userId, setUserId] = useState('');
    const [filter, setFilter] = useState(null);

    const supabase = useSupabaseClient();

    const getUserId = async (id) => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();

    async function handleFilterChange(curr) {
        if (curr == "active") {
            setFilter(false);
        } else if (curr == "complete") {
            setFilter(true);
        } else {
            setFilter(null);
        }
    }

    async function handleCreateToDo(e) {
        // TODO: make this faster, super slow rn
        setIsLoading(true);
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

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
    };

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
            <div className="filters btn-group stack-exception">
                <Button className="btn toggle-btn" onClick={() => handleFilterChange("all")}>
                    Show All Tasks
                </Button>
                <Button className="btn toggle-btn" onClick={() => handleFilterChange("active")}>
                    Show Active Tasks
                </Button>
                <Button className="btn toggle-btn" onClick={() => handleFilterChange("complete")}>
                    Show Completed Tasks
                </Button>
            </div>
            <h2 id="list-heading">Tasks Remaining</h2>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div>
                    <ReadToDo filter={filter} />
                </div>
            )}

        </div>
    );
}
export default ToDoPage;

