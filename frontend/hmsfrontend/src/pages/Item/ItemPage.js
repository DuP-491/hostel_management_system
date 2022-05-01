import { Button } from "@mui/material";
import { useState } from "react";
import AddItemForm from "../../components/Item/AddItemForm";
import FullScreenDialog from "../../components/UI/FullScreenDialog";
import ItemTable from "./../../components/Item/ItemTable/ItemTable";

import styles from "./ItemPage.module.css";

const ItemPage = (props) => {
  const [isAddOpen, setAddOpen] = useState(false);

  const dialogToggleHandler = (event) => {
    setAddOpen((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <center>
        <h1>Items</h1>
      </center>
      <div className={styles["item-table"]}>
        <ItemTable />
      </div>
      <center>
        <Button variant="contained" onClick={dialogToggleHandler}>
          Add new item
        </Button>
        <FullScreenDialog
          open={isAddOpen}
          onOpenToggle={dialogToggleHandler}
          title="Add new item"
          actions={
            <Button autoFocus color="inherit" onClick={dialogToggleHandler}>
              Save
            </Button>
          }>
          <AddItemForm />
        </FullScreenDialog>
      </center>
    </>
  );
};

export default ItemPage;
