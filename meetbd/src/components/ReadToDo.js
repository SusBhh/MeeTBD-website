import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import ToDo from './ToDo';

const ReadToDo = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [items, setItems] = useState([]);

    const supabase = useSupabaseClient();

    async function handleDelete(id) {
        setIsLoading(true);
        try {
            const { error } = await supabase
                .from("todos")
                .delete()
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        }
        await readToDo();
        setIsLoading(false);
    }

    async function handleComplete(item) {
        setIsLoading(true);
        try {
            const { error } = await supabase
                .from("todos")
                .update({ completed: !item.completed })
                .eq("id", item.id);
            

            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        }
        await readToDo();
        setIsLoading(false);
    }

    async function readToDo() {
        setIsLoading(true);

        // get user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // read todos
        const { error, data } = await supabase
            .from("todos") //the table you want to work with
            .select("id, name, owner, created_at, completed") // columns to select from the database
            .eq("owner", [user?.id]) // match only groups where user is a member
            .order("created_at", { ascending: false }); // sort the data so the last item comes on top;

        if (error) throw error; // check if there was an error fetching the data and move the execution to the catch block
        if (data) setItems(data);
        console.log(data)
        setIsLoading(false);
    }

    React.useEffect(() => {
        readToDo();
    }, []);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : items.length == 0 ? (
                <p>No todo item added yet</p>
            ) : (
                <div>
                    {items.map((item, i) => (
                        <ToDo
                            name={item.name} 
                            completed={item.completed} 
                            item={item}
                            id={item.id} 
                            owner={item.owner}
                            handleDelete={handleDelete}
                            handleComplete={handleComplete}
                            filter={props.filter}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReadToDo;
