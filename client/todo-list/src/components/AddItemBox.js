import React, { useState } from "react";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

const AddItemBox = (props) => {
  const { addCallback } = props;
  const [listItemText, setListItemText] = useState("");

  const handleChange = (e) => {
    setListItemText(e.target.value);
  };

  const handleClick = () => {
    const datum = {
      id: uuidv4(),
      list_item_title: listItemText,
      checked: false,
    };
    addCallback(datum);
    setListItemText("");
  };

  return (
    <div className={"add-item-box"}>
      <label htmlFor="listItemText">Label : </label>
      <input
        type="text"
        name={"listItemText"}
        value={listItemText}
        onChange={handleChange}
      />
      <Button
        variant={"contained"}
        onClick={handleClick}
        style={{ marginLeft: "10px" }}
      >
        Add
      </Button>
    </div>
  );
};

export default AddItemBox;
