import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./AddDemandItemForm.module.css";
import { useState } from "react";
import ItemComboBox from "../../components/Item/ItemComboBox";

const AddDemandItemForm = (props) => {
  const [item, setItem] = useState(null);
  const [requiredQuantity, setRequiredQuantity] = useState("");

  const itemChangeHandler = (value) => {
    setItem(value);
  };
  const requiredQuantityChangeHandler = (event) => {
    setRequiredQuantity(event.target.value);
  };

  const onAddClicked = () => {
    console.log(item.id);
    console.log(props.demandId);
    console.log(requiredQuantity);
  };

  return (
    <form className={styles["demand-item-form"]}>
      <ItemComboBox
        value={item}
        onChange={itemChangeHandler}
        className={styles["demand-item-form-field"]}
      />
      <TextField
        className={styles["demand-item-form-field"]}
        id="requiredQuantity"
        label="Required Quantity"
        type="number"
        variant="outlined"
        onChange={requiredQuantityChangeHandler}
      />
      <Button
        className={styles["demand-item-form-field"]}
        variant="contained"
        onClick={onAddClicked}>
        Add Item
      </Button>
    </form>
  );
};

export default AddDemandItemForm;
