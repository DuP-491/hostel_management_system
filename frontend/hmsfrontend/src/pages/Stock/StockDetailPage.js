import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
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

export default function StockDetailPage(props) {
  const [history, setHistory] = useState([]);
  const [item, setItem] = useState();
  const location = useLocation();
  // console.log(props.match.params.itemid)
  useEffect(() => {
    setItem(location.state.itemname);
    fetch("http://127.0.0.1:8000/api/mess/action/?id=" + location.state.itemid)
      .then((apiData) => apiData.json())
      .then((apiData) => {
        //   setSize(apiData.size);
        setHistory(apiData.data);
        return apiData;
      });
  }, []);
  return (
    <>
      <h1>Stock Table Entries for {item}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Date Time</TableCell>
              {/* <TableCell align="right">Brand</TableCell> */}
              <TableCell align="center">Quantity</TableCell>
              {/* <TableCell align="right">Unit</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" align="center" scope="row">
                  {row.action}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                {/* <TableCell align="right">{row.unit}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
