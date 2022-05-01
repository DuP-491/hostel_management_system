import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { messApi } from "../../utilities/serverConfigurations";

export default function ComboBox(props) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    let arr = [];
    fetch(`${messApi}/item/`)
      .then((response) => response.json())
      .then((data) => {
        data.data.forEach((item) => {
          arr.push(item);
        });
        setItems(arr);
      });
  }, []);

  return (
    <Autocomplete
      value={props.value}
      disablePortal
      id="combo-box-demo"
      options={items}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => {
        props.onChange(value);
      }}
      renderInput={(params) => <TextField {...params} label="Item Name" />}
    />
  );
}
