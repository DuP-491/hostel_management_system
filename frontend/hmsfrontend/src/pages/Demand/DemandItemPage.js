import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router";
import CustomTable from "../../components/UI/Table";
import { messApi } from "../../utilities/serverConfigurations";
import styles from "./DemandItemPage.module.css";
import Button from "@mui/material/Button";
import FullScreenDialog from "../../components/UI/FullScreenDialog";
import AddDemandItemForm from "./AddDemandItemForm";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent, DialogContentText } from "@mui/material";
import { TextField } from "@mui/material";
import { DialogActions } from "@mui/material";

const DemandItemPage = (props) => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState([]);
  const [isAddOpen, setAddOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [curDemand,setCurDemand] =useState();
  const [curItem,setCurItem] = useState();
  const [curDItem,setCurDItem] = useState();
  const [supply,setSupply] = useState(0);
  const [amount,setAmount] = useState(0);
  const [initSupply,setInitSupply] = useState(0);
  const [toLoad,setToLoad] = useState(false);
  const [isDisable,setIsDiable] = useState(false);

  const supplyChangeHandler =  (e) => {
    setSupply(e.target.value);
  }
  const amountChangeHandle = (e) => {
    setAmount(e.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUpdateDemand = () => {
    var totalSupply=(+supply) + (+initSupply);
    console.log(totalSupply);
    let options ={
      method:"PUT",
      body: JSON.stringify({
        id:curDItem,
        itemId:curItem,
        demandId:curDemand,
        suppliedQuantity: totalSupply,
        amount:amount,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
    fetch(`${messApi}/ditem/`,options)
  };
  const handleClose = () => {
    setOpen(false);
    setSupply();
    setAmount();
  };

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
  const handleSupply = (e,iid,did,ditemid) => {
    setOpen(true);
    setCurItem(iid);
    setInitSupply(did);
    setCurDItem(ditemid);
    console.log(initSupply);
  };
  useEffect(() => {
    setCurDemand(location.state.demandId);
    let arr = [];
    fetch(`${messApi}/ditem/?demandId=${location.state.demandId}`)
      .then((response) => response.json())
      .then((res) => {
        res.data.forEach((demandItem) => {
          arr.push({
            id: demandItem.itemId.id,
            did: demandItem.id,
            name: demandItem.itemId.name,
            brand: demandItem.itemId.brand,
            requiredQuantity: demandItem.requiredQuantity,
            suppliedQuantity: demandItem.suppliedQuantity,
            amount: demandItem.amount,
            edit: handleSupply,
          });
        });
        setRows(arr);
        
      });
  }, [toLoad]);

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
          isEdit={true}
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
        <AddDemandItemForm demandId={location.state.demandId} toLoad={toLoad} setToLoad={setToLoad} isDisable={isDisable} setIsDiable={setIsDiable} initSupply={initSupply}/>
      </FullScreenDialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Supply Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Supplied Quantity and Amount Paid
          </DialogContentText>
          <TextField
        className={styles["demand-item-form-field"]}
        id="suppliedQuantity"
        label="Supplied Quantity"
        type="number"
        variant="outlined"
        value={supply}
        onChange={supplyChangeHandler}
      />
      <TextField
        className={styles["demand-item-form-field"]}
        id="amountQuantity"
        label="Amount Quantity"
        type="number"
        variant="outlined"
        value={amount}
        onChange={amountChangeHandle}
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button disable={isDisable} onClick={handleUpdateDemand}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DemandItemPage;
