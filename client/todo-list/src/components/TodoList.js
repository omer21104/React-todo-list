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
import parseTodoListData from "../utils/ListParser";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isAddToggled, setIsAddToggled] = useState(false);

  useEffect(() => {
    apiService.FetchDataService.get_table_data().then((response) => {
      let tasks = parseTodoListData(response);
      setTasks(tasks);
    });
  }, []);

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
    setIsAddToggled(!isAddToggled);
  };

  const handleRemoveClick = () => {
    setTasks(tasks.filter((task) => task.checked === false));
  };

  const addNewItem = (item) => {
    apiService.PersistDataService.persist_list_item(item.text).then(
      (response) => response.data
    );

    setTasks([...tasks, item]);
  };

  return (
    <div className={"todolist-container"}>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {tasks.map((task) => {
          const { id, text } = task;
          const labelId = `checkbox-list-label-${text}`;

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
                    checked={task.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={text} />
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
        {isAddToggled && <AddItemBox addCallback={addNewItem} />}
      </div>
    </div>
  );
}
