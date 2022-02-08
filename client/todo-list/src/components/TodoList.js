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
import { parse } from "../utils/Parser";

export default function TodoList(props) {
  const { activeListName } = props;

  const [tasks, setTasks] = useState([]);
  const [isAddItemBoxToggled, setIsAddItemBoxToggled] = useState(false);

  useEffect(() => {
    apiService.FetchDataService.get_table_data(activeListName).then(
      (response) => {
        let tasks = parse(response.data);
        setTasks(tasks);
      }
    );
  }, [activeListName]);

  const handleListItemChecked = (value) => () => {
    const currentIndex = tasks.indexOf(value);
    const newTasks = [...tasks];

    if (currentIndex === -1) {
      return "error!";
    }

    newTasks[currentIndex].checked = !newTasks[currentIndex].checked;
    setTasks(newTasks);

    // signal DB that a listItem's checked field has changed
    apiService.UpdateDataService.update_checked_item(value.id).then(
      (response) => response
    );
  };

  const handleAddClick = () => {
    setIsAddItemBoxToggled(!isAddItemBoxToggled);
  };

  const handleRemoveClick = () => {
    // split tasks into checked and unchecked tasks
    let checkedTasks = [];
    let uncheckedTasks = [];
    tasks.forEach((task) =>
      (task.checked ? checkedTasks : uncheckedTasks).push(task)
    );

    // send only the id's to backend
    const selectedTasksIds = checkedTasks.map((task) => {
      return task.id;
    });
    setTasks(uncheckedTasks);

    // make sure there are selected tasks to be removed
    if (selectedTasksIds) {
      return;
    }
    apiService.DeleteDataService.delete_list_items(selectedTasksIds).then(
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
                onClick={handleListItemChecked(task)}
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
            {isAddItemBoxToggled ? "hide" : "Add new item"}
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
