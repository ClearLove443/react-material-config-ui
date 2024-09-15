// import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";

type MuiXProduct = TreeViewBaseItem<{
  internalId: string;
  label: string;
  path?: string;
}>;

const DATA_SOURCE: MuiXProduct[] = [
  {
    internalId: "nampb",
    label: "NAM PB",
  },
  {
    internalId: "namchub",
    label: "NAM CHUB",
  },
  {
    internalId: "namcmr",
    label: "NAM CMR",
  },
];

const DATA_DOAMIN: MuiXProduct[] = [
  {
    internalId: "namPBCustomer",
    label: "NAM PB Customer",
    children: [
      {
        internalId: "addNamPBCustomer",
        label: "Add",
        path: "/nam-pb-customer/add",
      },
    ],
  },
  {
    internalId: "namcCHUBCustomer",
    label: "NAM CHUB Customer",
    children: [
      {
        internalId: "addNamchubCustomer",
        label: "Add",
        path: "/nam-chub-customer/add",
      },
    ],
  },
  {
    internalId: "namCMRCustomer",
    label: "NAM CMR Customer",
    children: [
      {
        internalId: "addNamCMRCustomer",
        label: "Add",
        path: "/nam-cmr-customer/add",
      },
    ],
  },
];

const getItemId = (item: MuiXProduct) => item.internalId;

const SideBar = () => {
  // const [dataSource, setDataSource] = useState([
  //   { id: "namPB", label: "NAM PB", children: [] },
  //   { id: "namCHUB", label: "NAM CHUB", children: [] },
  // ]);
  const { dataSources, dataSourcesTable } = useStore();

  const navigate = useNavigate();

  const handleNavigate = (event: React.MouseEvent, path: string) => {
    navigate(path);
    event.stopPropagation();
  };
  const handleItemClick = (event: React.MouseEvent, itemId: string) => {
    const item = DATA_DOAMIN.find((i) => getItemId(i) === itemId);

    const addChild = (id: string) => {
      console.log(id);
    };
    debugger;
    if (item?.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      <div className="side-bar">
        {/* <Typography>
        {lastClickedItem == null
          ? "No item click recorded"
          : `Last clicked item: ${lastClickedItem}`}
      </Typography> */}
        <SimpleTreeView>
          <TreeItem itemId="home" label={<Link to="/">Home</Link>}></TreeItem>
          <div className="container">
            <TreeItem
              itemId="dataSource"
              label={
                <div className="container">
                  <li>Data Source</li>
                  <Button
                    variant="contained"
                    onClick={(event) =>
                      handleNavigate(event, "/data-source/add")
                    }
                    // component={Link}
                    // to="/data-source"
                  >
                    Add
                  </Button>
                </div>
              }
            >
              {dataSources.map((item: any) => (
                <TreeItem itemId={item.id} label={item.label} />
              ))}
            </TreeItem>
          </div>
          <TreeItem itemId="physical" label="Physical">
            {dataSources.map((item: any) => (
              <TreeItem
                itemId={item.id + "_physical"}
                label={
                  <div className="container">
                    <li>{item.label}</li>
                    <Button
                      variant="contained"
                      onClick={(event) =>
                        handleNavigate(event, "/data-source/table/" + item.id)
                      }
                      // component={Link}
                      // to={"/data-source/table/" + item.id}
                    >
                      Add
                    </Button>
                  </div>
                }
              >
                {dataSourcesTable[item.id]?.map((table: any) => (
                  <TreeItem
                    itemId={item.id + "_physical_" + table}
                    label={
                      <div className="container">
                        <li>{table}</li>
                        {/* <Button
                          variant="contained"
                          component={Link}
                          to={"/data-source/table/" + item.id + "/" + table}
                        >
                          Add
                        </Button> */}
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
              {/* <TreeItem itemId="namCHUB" label="NAM CHUB">
              <TreeItem
                itemId="addNamCHUB"
                label={<Link to="/nam-chub/add">Add</Link>}
              />
            </TreeItem> */}
            </TreeItem>

            {/* <RichTreeView
            onItemClick={handleItemClick}
            items={DATA_DOAMIN}
            getItemId={getItemId}
          /> */}
          </TreeItem>
        </SimpleTreeView>
      </div>
    </>
  );
};

export default SideBar;
