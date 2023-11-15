import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const ReadGroups = () => {
  const [groups, setGroups] = React.useState([]);

  const supabase = useSupabaseClient();

  // TODO: delete group
  // const deleteItem = async (id) => {
  //     try {
  //       const user = supabase.auth.user();

  //       const { error } = await supabase
  //         .from("todo")
  //         .delete() //delete the row
  //         .eq("id", id) //the id of row to delete
  //         .eq("userId", user?.id) //check if the item being deleted belongs to the user

  //       if (error) throw error;

  //       await getInactiveItems(); //get the new completed items list
  //       await getActiveItems(); //get the new active items list
  //     } catch (error) {
  //       alert(error.error_description || error.message);
  //     }
  //   };

  // TODO: edit group
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

  async function readGroups() {
    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

  // TODO: read groups
  const { error, data } = await supabase
      .from("groups")                       //the table you want to work with
      .select("id, name, owner, members")   // columns to select from the database
      .in("members", user?.id)              // match only groups where user is a member
      .order("id", { ascending: false });   // sort the data so the last item comes on top;
    if (error) throw error;                 // check if there was an error fetching the data and move the execution to the catch block
    if (data) setGroups(data);
    console.log(groups);
  }

  return (
  <div>
    
  </div>
  );
};

export default ReadGroups;
