import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";
const SideBar2 = () => {
  const [openDataSource, setOpenDataSource] = useState(true);

  const handleOpenDataSource = () => {
    setOpenDataSource(!openDataSource);
  };

  const [openSemiLogic, setOpenSemiLogic] = useState(true);

  const handleOpenSemiLogic = () => {
    setOpenSemiLogic(!openSemiLogic);
  };

  return (
    <div className="side-bar">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Nested List Items
        //   </ListSubheader>
        // }
      >
        <ListItemButton component={Link} to={"/"}>
          {/* <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon> */}
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={handleOpenDataSource}>
          {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
          <ListItemText primary="Data Source" />
          {openDataSource ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDataSource} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to={"/data-source"} sx={{ pl: 4 }}>
              {/* <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon> */}
              <ListItemText primary="Add" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="NAM PB" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="NAM CHUB" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="NAM CMR" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleOpenSemiLogic}>
          <ListItemText primary="Semi Logic" />
          {openSemiLogic ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openSemiLogic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to={"/logic"} sx={{ pl: 4 }}>
              <ListItemText primary="Add" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default SideBar2;
