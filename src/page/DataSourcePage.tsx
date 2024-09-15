import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  addDataSourceApi,
  delDatasourceByUUID,
  getAllDatasource,
  getDatasourceByUUID,
  getRegionsApi,
  getTypesApi,
} from "../service/customer";
import useStore from "../store";

const DataSourcePage = () => {
  // const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { action, sourceUUid } = useParams();
  const [enabled, setEnabled] = useState(true);

  const { setDataSources, loading, setLoading } = useStore();

  const addDataSource = async () => {
    setLoading(true);
    const params = {
      region: region,
      org: org,
      type: type,
      id: region + "_" + org,
      uuid: sourceUUid || uuidv4(),
      label: region + " " + org,
      username: username,
      password: password,
      url: url,
    };
    try {
      const response = await addDataSourceApi(params);
      // setDataSources([params]);
      const res = await getAllDatasource();
      const datasources = res.data;
      setDataSources(datasources);
      console.log("数据源添加成功:", response.data);
      const message = "data source added successfully";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      console.error("添加数据源失败:", error);
      const message = "data source added failed";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const removeDataSource = async () => {
    setLoading(true);
    try {
      await delDatasourceByUUID(sourceUUid);
      const res = await getAllDatasource();
      const datasources = res.data;
      setDataSources(datasources);
      console.log("data source removed successfully");
      const message = "data source removed successfully";
      enqueueSnackbar(message, { variant: "success" });
    } catch (error) {
      const message = "data source removed failed";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const [regionOptions, setRegionOptions] = useState<any[]>([]);
  const [typeOptions, setTypeOptions] = useState<any[]>([]);
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");

  // const getRegionsApi = () => {
  //   return new Promise<RegionResponse>((resolve) => {
  //     setTimeout(() => {
  //       resolve({ regions: ["APAC", "EMEA", "NAM"] });
  //     }, 1000);
  //   });
  // };

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {
        // const data: RegionResponse = await getRegionsApi();
        const res = await getRegionsApi();
        const data = res.data;
        setRegionOptions(data.regions);
      } catch (error) {
        console.error("Error fetching regions:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTypesApi = async () => {
      setLoading(true);
      try {
        // const data: RegionResponse = await getRegionsApi();
        const res = await getTypesApi();
        const data = res.data;
        setTypeOptions(data.types);
      } catch (error) {
        console.error("Error fetching regions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
    fetchTypesApi();
  }, []);

  useEffect(() => {
    setEnabled(action !== "view");
  }, [action]);

  useEffect(() => {
    if (!!sourceUUid) {
      const fetchDatasourceByUUID = async () => {
        setLoading(true);
        try {
          // const data: RegionResponse = await getRegionsApi();
          const res = await getDatasourceByUUID(sourceUUid);
          // debugger;
          const data = res.data;
          // alert(data);
          setRegion(data.region);
          setOrg(data.org);
          setType(data.type);
          setUserName(data.username);
          setPassword(data.password);
          setURL(data.url);
        } catch (error) {
          console.error("Error fetching regions:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDatasourceByUUID();
    }
  }, [sourceUUid]);

  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const [org, setOrg] = useState("");

  const handleOrgChange = (event: SelectChangeEvent) => {
    setOrg(event.target.value as string);
  };

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setURL] = useState("");
  return (
    <>
      <section>
        {/* <div>{action}</div>
        <div>{sourceUUid}</div> */}
        <div>{enabled}</div>
        <Box margin="0 auto" width="fit-content">
          <Box>
            {!enabled && (
              <div
                className="pad20"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <Button
                  variant="contained"
                  style={{ marginLeft: "-100px" }}
                  onClick={() => setEnabled(true)}
                >
                  Edit
                </Button> */}
                <Fab
                  size="medium"
                  color="primary"
                  aria-label="edit"
                  style={{ marginLeft: "-100px" }}
                  onClick={() => setEnabled(true)}
                >
                  <EditIcon />
                </Fab>

                {/* <Button
                  variant="contained"
                  color="error"
                  style={{ marginRight: "-100px" }}
                  onClick={removeDataSource}
                >
                  Remove
                </Button> */}
                <Fab
                  size="medium"
                  color="error"
                  aria-label="remove"
                  disabled={loading}
                  style={{ marginRight: "-100px" }}
                  onClick={removeDataSource}
                >
                  <RemoveIcon />
                </Fab>
              </div>
            )}
            <div className="pad20">
              <FormControl fullWidth>
                <InputLabel id="region-select-label" disabled={!enabled}>
                  Region
                </InputLabel>
                <Select
                  labelId="region-select-label"
                  id="region-select"
                  value={region}
                  label="Region"
                  onChange={handleRegionChange}
                  style={{ width: 200 }}
                  disabled={!enabled}
                >
                  {regionOptions.map((regionOption) => (
                    <MenuItem key={regionOption} value={regionOption}>
                      {regionOption}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={"APAC"}>APAC</MenuItem>
                  <MenuItem value={"EMEA"}>EMEA</MenuItem>
                  <MenuItem value={"NAM"}>NAM</MenuItem> */}
                </Select>
              </FormControl>
            </div>
            <div className="pad20">
              <FormControl fullWidth>
                <InputLabel id="org-select-label" disabled={!enabled}>
                  ORG
                </InputLabel>
                <Select
                  labelId="org-select-label"
                  id="org-select"
                  value={org}
                  label="Organization"
                  onChange={handleOrgChange}
                  style={{ width: 200 }}
                  disabled={!enabled}
                >
                  <MenuItem value={"CHUB"}>CHUB</MenuItem>
                  <MenuItem value={"PB"}>PB</MenuItem>
                  <MenuItem value={"CMR"}>CMR</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="pad20">
              <FormControl fullWidth>
                <InputLabel id="type-select-label" disabled={!enabled}>
                  Type
                </InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  label="type"
                  onChange={handleTypeChange}
                  style={{ width: 200 }}
                  disabled={!enabled}
                >
                  {typeOptions.map((typeOption) => (
                    <MenuItem key={typeOption} value={typeOption}>
                      {typeOption}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={"APAC"}>APAC</MenuItem>
                  <MenuItem value={"EMEA"}>EMEA</MenuItem>
                  <MenuItem value={"NAM"}>NAM</MenuItem> */}
                </Select>
              </FormControl>
            </div>
            <div className="pad20">
              <TextField
                id="username"
                label="User Name"
                variant="outlined"
                value={username}
                disabled={!enabled}
                onChange={(event: any) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div className="pad20">
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                disabled={!enabled}
                onChange={(event: any) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="pad20">
              <TextField
                id="url"
                label="URL"
                variant="outlined"
                value={url}
                disabled={!enabled}
                onChange={(event: any) => {
                  setURL(event.target.value);
                }}
              />
            </div>
            <div className="pad20">
              {/* <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={addDataSource}
                variant="outlined"
              >
                Save2
              </LoadingButton> */}

              {/* <Button
                variant="contained"
                onClick={addDataSource}
                className="saveBtn"
                disabled={loading || !enabled}
              >
                Save
              </Button> */}
              <Fab
                size="medium"
                color="primary"
                aria-label="save"
                className="saveBtn"
                disabled={loading || !enabled}
                onClick={addDataSource}
              >
                <SaveIcon />
              </Fab>
              {/* {loading && (
                <CircularProgress
                  size={50}
                  sx={{
                    display: "block",
                    position: "relative",
                    top: -50,
                    left: 160,
                    zIndex: 1,
                  }}
                />
              )} */}
              {/* {!loading && (
                <CircularProgress
                  size={50}
                  sx={{
                    display: "block",
                    position: "relative",
                    top: -40,
                    left: 150,
                    zIndex: 1,
                  }}
                />
              )} */}
            </div>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default DataSourcePage;
