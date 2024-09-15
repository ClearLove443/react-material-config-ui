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
import useStore from "../store";
const TableColumnPage = () => {
  const { sourceId } = useParams();
  const { addDataSources } = useStore();

  const addDataSource = () => {
    addDataSources({
      column: column,
    });
  };
  const [column, setColumn] = useState("");

  const handleColumnChange = (event: SelectChangeEvent) => {
    setColumn(event.target.value as string);
  };

  return (
    <>
      <section>
        <Box margin="0 auto" width="400px">
          <Box>
            <div className="pad20">
              <InputLabel id="column-select-label">Column</InputLabel>
              <Select
                labelId="column-select-label"
                id="column-select"
                value={column}
                label="column"
                onChange={handleColumnChange}
                style={{ width: 200 }}
              >
                <MenuItem value={"APAC"}>APAC</MenuItem>
                <MenuItem value={"EMEA"}>EMEA</MenuItem>
                <MenuItem value={"NAM"}>NAM</MenuItem>
              </Select>
            </div>

            <div className="pad20">
              <Button variant="contained" onClick={addDataSource}>
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

export default TableColumnPage;
