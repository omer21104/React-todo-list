import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import AddItemBox from "./AddItemBox";
import apiService from "../api";
import { parseTodoListData } from "../utils/ListParser";

export default function TodoList(props) {
  const { activeListName } = props;

  const [tasks, setTasks] = useState([]);
  const [isAddItemBoxToggled, setIsAddItemBoxToggled] = useState(false);

  useEffect(() => {
    apiService.FetchDataService.get_table_data(activeListName).then(
      (response) => {
        let tasks = parseTodoListData(response);
        setTasks(tasks);
      }
    );
  }, [activeListName]);

  const handleToggle = (value) => () => {
    const currentIndex = tasks.indexOf(value);
    const newTasks = [...tasks];

    if (currentIndex === -1) {
      console.log("????");
    } else {
      newTasks[currentIndex].checked = !newTasks[currentIndex].checked;
    }

    setTasks(newTasks);
  };

  const handleAddClick = () => {
    setIsAddItemBoxToggled(!isAddItemBoxToggled);
  };

  const handleRemoveClick = () => {
    setTasks(tasks.filter((task) => task.checked === false));

    // testing delete functionality
    apiService.DeleteDataService.delete_list_item("omer").then(
      (response) => response.data
    );
  };

  const addNewItemCallback = (item) => {
    item = { ...item, list_name: activeListName };
    apiService.PersistDataService.persist_list_item(item).then(
      (response) => response.data
    );

    setTasks([...tasks, item]);
  };

  return (
    <div className={"todolist-container"}>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {tasks.map((task) => {
          const { id, list_item_title, checked } = task;
          const labelId = `checkbox-list-label-${list_item_title}`;

          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(task)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={list_item_title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant={"contained"} onClick={handleAddClick}>
            Add new item
          </Button>
          <Button variant={"contained"} onClick={handleRemoveClick}>
            Remove selected
          </Button>
        </Stack>
        {isAddItemBoxToggled && <AddItemBox addCallback={addNewItemCallback} />}
      </div>
    </div>
  );
}
