import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CustomTable from "../../components/UI/Table";
import { messApi } from "../../utilities/serverConfigurations";
import styles from "./DemandItemPage.module.css";
import Button from "@mui/material/Button";
import FullScreenDialog from "../../components/UI/FullScreenDialog";

const DemandItemPage = (props) => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState([]);
  const [isAddOpen, setAddOpen] = useState(false);

  const pageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const limitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };
  const dialogToggleHandler = () => {
    setAddOpen((prev) => {
      return !prev;
    });
  };

  const columns = [
    { id: "name", label: "Name" },
    { id: "brand", label: "Brand" },
    { id: "requiredQuantity", label: "Required Qty" },
    { id: "suppliedQuantity", label: "Supplied Qty" },
    { id: "amount", label: "Amount" },
  ];

  useEffect(() => {
    let arr = [];
    fetch(`${messApi}/ditem/?demandId=${location.state.demandId}`)
      .then((response) => response.json())
      .then((res) => {
        res.data.forEach((demandItem) => {
          arr.push({
            id: demandItem.itemId.id,
            name: demandItem.itemId.name,
            brand: demandItem.itemId.brand,
            requiredQuantity: demandItem.requiredQuantity,
            suppliedQuantity: demandItem.suppliedQuantity,
            amount: demandItem.amount,
          });
        });
        setRows(arr);
      });
  }, []);

  return (
    <>
      <center>
        <h1>Demand Item Page</h1>
      </center>
      <div className={styles["demand-table"]}>
        <CustomTable
          columns={columns}
          rows={rows}
          page={page}
          limit={limit}
          onPageChanged={pageChangeHandler}
          onLimitChanged={limitChangeHandler}
        />
      </div>
      <center>
        <Button variant="contained" onClick={dialogToggleHandler}>
          Add new item
        </Button>
      </center>
      <FullScreenDialog
        open={isAddOpen}
        onOpenToggle={dialogToggleHandler}
        title="Add new item"
        actions={
          <Button autoFocus color="inherit" onClick={dialogToggleHandler}>
            Save
          </Button>
        }>
        <p>Form here</p>
      </FullScreenDialog>
    </>
  );
};

export default DemandItemPage;
