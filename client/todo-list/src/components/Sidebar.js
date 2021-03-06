import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddListBox from "./AddListBox";
import apiService from "../api";
import { parse } from "../utils/Parser";

const Sidebar = (props) => {
  const { listClickedCallback } = props;

  const [lists, setLists] = useState([]);
  const [isAddNewListToggled, setIsAddNewListToggled] = useState(false);

  useEffect(() => {
    apiService.FetchDataService.get_lists().then((response) => {
      setLists(parse(response.data));
    });
  }, []);

  const handleListClick = (e) => {
    listClickedCallback(e.target.innerHTML);
  };

  const handleNewListButtonClick = () => {
    setIsAddNewListToggled(!isAddNewListToggled);
  };

  const newListAddedCallback = (newList) => {
    apiService.PersistDataService.persist_new_list(newList).then(null, null);
    setLists([...lists, { id: 0, list_name: newList }]);
  };

  return (
    <div className={"sidebar"}>
      <h2>Your lists: </h2>
      <ul>
        {lists.map((list) => {
          return (
            <li onClick={handleListClick} key={list.id}>
              {list.list_name}
            </li>
          );
        })}
      </ul>
      <Button variant={"contained"} onClick={handleNewListButtonClick}>
        {isAddNewListToggled ? "hide" : "New list"}
      </Button>
      <div>
        {isAddNewListToggled && (
          <AddListBox addNewListCallback={newListAddedCallback} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
