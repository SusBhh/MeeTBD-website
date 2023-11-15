import React from 'react';

import CreateGroup from '../components/CreateGroup';
import ReadGroups from '../components/ReadGroups';

const GroupsPage = () => {

    // TODO: join by ID
    // const updateItem = async ({ item, id }) => {
    //     setLoading(true);
    //     try {
    //       const user = supabase.auth.user();
    
    //       const { error } = await supabase
    //         .from("todo")
    //         .update({ item })
    //         .eq("userId", user?.id)
    //         .eq("id", id); //matching id of row to update
    
    //       if (error) throw error;
    
    //       await getActiveItems();
    //     } catch (error) {
    //       alert(error.error_description || error.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    
    return (
        <div>
            <h1>Groups Page</h1>
            <div>
                {/* list groups here */}
                <ReadGroups />
            </div>
            <div id="add-group">
                {/* add groups here */}
                <h2>Join an Existing Group by ID</h2>
                <h2>Create a New Group</h2>
                <CreateGroup />
            </div>
        </div>
    );
};


export default GroupsPage;