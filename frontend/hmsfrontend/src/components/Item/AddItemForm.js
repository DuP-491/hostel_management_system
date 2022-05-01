import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styles from "./AddItemForm.module.css";

import CategoryComboBox from "../Category/CategoryComboBox";
import { useRef, useState } from "react";
import { messApi } from "../../utilities/serverConfigurations";
import Autocomplete from '@mui/material/Autocomplete';

const AddItemForm = (props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(null);
  const [unit,setUnit] = useState();
  const categoryRef = useRef();
  const unitRef = [
    {label: "kg"},
    {label: "lt"},
  ]

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const brandChangeHandler = (event) => {
    setBrand(event.target.value);
  };
  const descChangeHandler = (event) => {
    setDesc(event.target.value);
  };
  const unitChangeHandler = (event) => {
    setUnit(event.target.value);
  }
  const onAddClicked = (event) => {
    // console.log(name);
    // console.log(brand);
    // console.log(desc);
    // console.log(category.name);

    fetch(`${messApi}/item/`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        brand: brand,
        desc: desc,
        category: category.name,
        unit: unit.label,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
  };

  return (
    <form className={styles["item-form"]}>
      <TextField
        className={styles["item-form-field"]}
        id="name"
        label="Name"
        variant="outlined"
        onChange={nameChangeHandler}
      />
      <TextField
        className={styles["item-form-field"]}
        id="brand"
        label="Brand"
        variant="outlined"
        onChange={brandChangeHandler}
      />
      <TextField
        className={styles["item-form-field"]}
        id="desc"
        label="Description"
        multiline
        maxRows={10}
        onChange={descChangeHandler}
      />
      <CategoryComboBox
        className={styles["item-form-field"]}
        ref={categoryRef}
        value={category}
        setValue={setCategory}
      />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={unit}
        onChange={(event, newValue) => {
          setUnit(newValue);
          console.log(unit)
        }}
      options={unitRef}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Unit" />}
    />
      <Button
        className={styles["item-form-field"]}
        variant="contained"
        onClick={onAddClicked}>
        Add Item
      </Button>
    </form>
  );
};

export default AddItemForm;
