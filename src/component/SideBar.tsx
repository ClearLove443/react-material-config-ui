import AddIcon from "@mui/icons-material/Add";
import { Button, Fab } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";
const SideBar = () => {
  const { dataSources, dataSourcesTable } = useStore();

  const navigate = useNavigate();

  const handleNavigate = (event: React.MouseEvent, path: string) => {
    navigate(path);
    event.stopPropagation();
  };

  return (
    <>
      <div className="side-bar">
        <SimpleTreeView>
          <TreeItem itemId="home" label={<Link to="/">Home</Link>} />
          <div className="container">
            <TreeItem
              itemId="dataSource"
              label={
                <div className="container">
                  <li className="h50">Data Source</li>
                  {/* <Button
                    variant="contained"
                    onClick={(event) =>
                      handleNavigate(event, "/data-source/add")
                    }
                  >
                    Add
                  </Button> */}
                  <Fab
                    color="primary"
                    aria-label="add"
                    onClick={(event) =>
                      handleNavigate(event, "/data-source/add")
                    }
                  >
                    <AddIcon />
                  </Fab>
                </div>
              }
            >
              {dataSources.map((item: any) => (
                <TreeItem
                  itemId={item.uuid}
                  label={
                    <div className="container">
                      <li className="h50">{item.label}</li>
                    </div>
                  }
                  onClick={(event) =>
                    handleNavigate(event, "/data-source/view/" + item.uuid)
                  }
                />
              ))}
            </TreeItem>
          </div>
          <TreeItem
            itemId="physical"
            label={
              <div className="container">
                <li className="h50">Physical</li>
              </div>
            }
          >
            {dataSources.map((item: any) => (
              <TreeItem
                itemId={item.uuid + "_physical"}
                label={
                  <div className="container h50">
                    <li className="h50">{item.label}</li>

                    <Fab
                      size="medium"
                      color="primary"
                      aria-label="add"
                      onClick={(event) =>
                        handleNavigate(event, "/data-source/table/" + item.uuid)
                      }
                    >
                      <AddIcon />
                    </Fab>
                    {/* <Button
                      variant="contained"
                      onClick={(event) =>
                        handleNavigate(event, "/data-source/table/" + item.uuid)
                      }
                    >
                      Add
                    </Button> */}
                  </div>
                }
              >
                {dataSourcesTable[item.uuid]?.map((table: any) => (
                  <TreeItem
                    itemId={table.uuid}
                    label={
                      <div className="container">
                        <li>{table.name}</li>
                      </div>
                    }
                  ></TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeItem>
          <TreeItem itemId="semilogic" label="Semi Logic">
            <TreeItem itemId="customer" label="Customer">
              <div className="container">
                <TreeItem itemId="namPB" label="NAM PB" />
                <Button variant="contained" component={Link} to="/nam-chub/add">
                  Add
                </Button>
              </div>
              <div className="container">
                <TreeItem itemId="namCHUB" label="NAM CHUB" />
                <Button variant="contained" component={Link} to="/nam-chub/add">
                  Add
                </Button>
              </div>
            </TreeItem>
          </TreeItem>
        </SimpleTreeView>
      </div>
    </>
  );
};

export default SideBar;
