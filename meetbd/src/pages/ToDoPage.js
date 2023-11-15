import React from 'react';
import ToDo from '../components/ToDo';
import '../components/ToDo.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ToDoPage = () => {
    const supabase = useSupabaseClient();
    async function handleCreateToDo(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // get user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // insert group into db
        await supabase.from("todos").insert({
            name: formJson["name"],
            id: formJson["id"],
            completed: formJson["completed"],
            owner: user?.id,
        });

        console.log({
            name: formJson["name"],
            id: formJson["id"],
            completed: formJson["completed"],
            owner: user?.id,
        });
    }

    return (
        <div className="todoapp stack-large">
            <h1>To-Do List</h1>
            <form>
                <TextField
                    id="new-todo-input"
                    className="input input__lg"
                    label="Add new to-do item"
                    placeholder="Input an item"
                    autoComplete="off"
                    multiline
                />
                <Button type="submit" className="btn btn__primary btn__lg" onSubmit={handleCreateToDo}>
                    Add
                </Button>
            </form>
            <div className="filters btn-group stack-exception">
                <Button className="btn toggle-btn" aria-pressed="true">
                    Show All Tasks
                </Button>
                <Button className="btn toggle-btn" aria-pressed="false">
                    Show Active Tasks
                </Button>
                <Button className="btn toggle-btn" aria-pressed="false">
                    Show Completed Tasks
                </Button>
            </div>
            <h2 id="list-heading">Tasks Remaining</h2>
            <ToDo name="Eat" completed={true} id="todo-0" />
            <ToDo name="Sleep" completed={false} id="todo-1" />
            <ToDo name="Code" completed={false} id="todo-2" />


        </div>
    );
}
export default ToDoPage;

