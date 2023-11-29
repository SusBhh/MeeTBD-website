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

    const updateComplete = (completed) => {
        setCompleted(!completed);
    }
    const getUserId = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();

    const handleCreateToDo = async () => {
        setIsLoading(true);
        setCompleted(false)
        if (!itemName) {
            alert('Please fill in the event name.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('todos')
                .insert([
                    {
                        name: itemName,
                        completed: completed,
                        owner: userId
                    },
                ]);

            if (error) {
                throw error;
            }

            // If the operation was successful, close the CreateEvent component
            alert('added todo i think');
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error scenarios (e.g., show an error message)
        }
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
            {/* <ToDo name="Eat" completed={true} id="todo-0" />
            <ToDo name="Sleep" completed={false} id="todo-1" />
            <ToDo name="Code" completed={false} id="todo-2" /> */}
            <ToDo name="Code" completed={false} id="todo-2" />
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

