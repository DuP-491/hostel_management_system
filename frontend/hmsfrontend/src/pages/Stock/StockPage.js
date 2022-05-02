import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function Row(props) {
  const { row, item,handleReload } = props;
  const [open, setOpen] = React.useState(false);
  const [quantityForm, setQuantityForm] = React.useState(0);
  const [canSubmit,setCanSubmit] = React.useState(true);
  
  const quantityChange = (e) => {
    e.preventDefault();
    if(!isNaN(e.target.value) && e.target.value !=0 && e.target.value <= row.quantity )
    setCanSubmit(false);
    else
    setCanSubmit(true);
    setQuantityForm(e.target.value);
  };
  const actionFormSubmit = () => {
    let options = {
      method: "POST",
      body: JSON.stringify({
        item: item,
        action: 2,
        quantity: quantityForm,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    fetch("http://localhost:8000/api/mess/action/", options).then(res=>{    
      setQuantityForm(0)
      setCanSubmit(true);
      handleReload();
    });
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <Link
          to={{ pathname: `/stock/${row.item.id}` }}
          state={{ itemid: row.item.id, itemname: row.item.name }}>
          <TableCell component="th" align="left" scope="row">
            {row.item.name}
          </TableCell>
        </Link>
        {/* <TableCell>{row.item.id}</TableCell> */}
        <TableCell align="left">{row.item.brand}</TableCell>
        <TableCell align="left">{row.quantity}</TableCell>
        <TableCell align="left">{row.item.unit}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            <TextField
                    id="outlined-basic"
                    label="Consumption Form"
                    variant="outlined"
                    value={quantityForm}
                    onChange={quantityChange}
                  />

                  <Button variant="contained" disabled={canSubmit} onClick={actionFormSubmit}>
                    submit
                  </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const StockPage = (props) => {
  // const {data,loading ,error}=useFetch('http://127.0.0.1:8000/api/mess/stock/')
  const [stocks, setStocks] = useState([]);
  const [size, setSize] = useState(0);
  const [reload,setReload] = React.useState(false);

  const handleReload = () => {
    setReload(!reload);
    console.log("hi");
  }
    useEffect(() => {
    fetch("http://127.0.0.1:8000/api/mess/stock/")
      .then((apiData) => apiData.json())
      .then((apiData) => {
        setSize(apiData.size);
        setStocks(apiData.data);
        return apiData;
      });
    // .then(data=>console.log(data));
  }, [reload]);
  return (
    <>
      <h1>Stock page</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Item Name</TableCell>
              {/* <TableCell align="right">Item ID</TableCell> */}
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Current Stock</TableCell>
              <TableCell align="right">Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((row) => (
              <Row key={row.item.id} row={row} item={row.item.id} handleReload={handleReload}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StockPage;
