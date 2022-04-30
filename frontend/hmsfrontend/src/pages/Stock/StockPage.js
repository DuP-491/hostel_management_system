import React from "react";
import { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const StockPage = (props) => {
  // const {data,loading ,error}=useFetch('http://127.0.0.1:8000/api/mess/stock/')
  const [stocks,setStocks]=useState([])
  const [size,setSize]=useState(0)
  useEffect( () => {
    fetch('http://127.0.0.1:8000/api/mess/stock/')
        .then(apiData=>apiData.json())
        .then(apiData=>{
          setSize(apiData.size);
          setStocks(apiData.data);
          return apiData;
        })
        .then(data=>console.log(data));
},[])
  return (
  <>
  <h1>Stock page</h1>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Item ID</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Current Stock</TableCell>
            <TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((row) => (
            <TableRow 
              key={row.item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Link to={{ pathname: `/stock/${row.item.id}` }} state={{itemid:row.item.id}}>
              <TableCell component="th" scope="row">
                {row.item.name}
              </TableCell>
              </Link>
              <TableCell align="right">{row.item.id}</TableCell>
              <TableCell align="right">{row.item.brand}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
};

export default StockPage;