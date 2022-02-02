import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import AddItemBox from "./AddItemBox";
import apiService from "../api";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isAddToggled, setIsAddToggled] = useState(false);

  useEffect(() => {
    apiService.FetchDataService.get_table_data().then((response) => {
      let data = JSON.parse(response.data);
      let fields = data.map((item) => {
        const { fields } = item;
        return fields;
      });

      let list = fields.map((field) => {
        const { list_item_title } = field;
        return list_item_title;
      });

      let tasks = [];
      for (let i = 0; i < list.length; i++) {
        tasks.push({
          key: i,
          text: list[i],
          checked: false,
        });
      }

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
    console.log("add clicked");
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
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tasks.map((task) => {
          const { key, text } = task;
          const labelId = `checkbox-list-label-${text}`;

          return (
            <ListItem
              key={key}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
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
