import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./AddDemandItemForm.module.css";
import { useState } from "react";
import ItemComboBox from "../../components/Item/ItemComboBox";
import { messApi } from "../../utilities/serverConfigurations";

const AddDemandItemForm = (props) => {
  const [item, setItem] = useState(null);
  const [requiredQuantity, setRequiredQuantity] = useState("");
  const toLoad=props.toLoad;
  const setToLoad=props.setToLoad;
  const isDisable=props.setDisable;
  const setIsDiable=props.setIsDiable;
  const itemChangeHandler = (value) => {
    setItem(value);
  };
  const requiredQuantityChangeHandler = (event) => {
    // if(!isNaN(e.target.value) && e.target.value !=0 && e.target.value <= row.quantity )
    // setIsDiable(false);
    // else
    // setIsDiable(true);
    setRequiredQuantity(event.target.value);
  };

  const onAddClicked = () => {
    let options={
      method:"POST",
      body: JSON.stringify({
        itemId:item.id,
        demandId:props.demandId,
        requiredQuantity:requiredQuantity
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
    fetch(`${messApi}/ditem/`,options)
    .then(res=>{
      setToLoad(!toLoad);
    })
    // .then(apiData=>JSON(apiData))
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
