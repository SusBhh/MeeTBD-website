import React from "react";
import { Button } from "@mui/material";
import Modal from "react-modal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import "../newstyles.css";

const CreateGroup = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const supabase = useSupabaseClient();

  async function handleCreateGroup(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    // get user
    const {
        data: { user },
      } = await supabase.auth.getUser();
  
    //  TODO: some sort of email validation
    // split group member emails into individual emails
    let emailArray = [user.id];
    if (formJson["groupMembers"].length > 0) {
        emailArray = [user.id].concat(formJson["groupMembers"].split(","));
    }
    emailArray.filter((n) => n);

    // insert group into db
    await supabase.from("groups").insert({
        name: formJson["groupName"],
        owner: user?.id,
        members: emailArray,
      });

    closeModal();
  }

  return (
    <div>
      <Button
        onClick={() => {
          openModal();
        }}
        variant="contained"
        size="small"
      >
        Create Group
      </Button>
      <Modal
        style={customStyles}
        isOpen={modalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div>
          <h3>Create a new group</h3>
          <form onSubmit={handleCreateGroup}>
            <label>
              Group name: <input name="groupName" />
            </label>
            <hr />
            {/* TODO: google contacts API autofill? */}
            <label>
              Group member emails: <input name="groupMembers" />
            </label>
            <hr />
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button>
          </form>
        </div>
        <form>{/* insert form here */}</form>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default CreateGroup;
