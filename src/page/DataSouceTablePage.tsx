import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useStore from "../store";
const DataSourceTablePage = () => {
  const { sourceUUid } = useParams();
  const { dataSourcesTable, addSourcesTable } = useStore();

  const [table, setTable] = useState<string[]>([]);
  const addDataSource = () => {
    dataSourcesTable[sourceUUid + ""] = table.map((t) => ({
      uuid: uuidv4(),
      name: t,
    }));
    addSourcesTable(dataSourcesTable);
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setTable(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <section>
        <Box margin="0 auto" width="400px">
          <Box>
            <div>{sourceUUid}</div>

            <div className="pad20">
              <InputLabel id="table-select-label">Table</InputLabel>
              <Select
                labelId="table-select-label"
                id="table-select"
                multiple
                value={table}
                label="Table"
                onChange={handleRegionChange}
                style={{ width: 200 }}
              >
                <MenuItem value={"tb1"}>tb1</MenuItem>
                <MenuItem value={"tb2"}>tb2</MenuItem>
                <MenuItem value={"tb3"}>tb3</MenuItem>
              </Select>
            </div>

            <div className="pad20">
              <Button
                variant="contained"
                onClick={addDataSource}
                className="saveBtn"
              >
                Save
              </Button>
            </div>
          </Box>
          <FormControl fullWidth></FormControl>
        </Box>
      </section>
    </>
  );
};

export default DataSourceTablePage;
