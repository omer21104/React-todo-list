import React, { useState } from "react";
import Button from "@mui/material/Button";

const AddListBox = (props) => {
  const { addNewListCallback } = props;

  const [listName, setListName] = useState("");

  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  const handleCreateButtonClick = () => {
    addNewListCallback(listName);
  };

  return (
    <div>
      <label htmlFor="listName">List name : </label>
      <input
        type="text"
        name={"listName"}
        value={listName}
        onChange={handleListNameChange}
      />
      <Button
        variant={"contained"}
        onClick={handleCreateButtonClick}
        style={{ marginLeft: "10px" }}
      >
        Create!
      </Button>
    </div>
  );
};

export default AddListBox;
