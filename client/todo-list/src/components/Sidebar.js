import React, { useState } from "react";
import Button from "@mui/material/Button";

const Sidebar = () => {
  const [lists, setLists] = useState(["list 1", "list 2", "list 3"]);

  return (
    <div className={"sidebar"}>
      <h2>Your lists: </h2>
      <ul>
        {lists.map((list) => {
          return <h2>{list}</h2>;
        })}
      </ul>
      <Button variant={"contained"}>New list</Button>
    </div>
  );
};

export default Sidebar;
