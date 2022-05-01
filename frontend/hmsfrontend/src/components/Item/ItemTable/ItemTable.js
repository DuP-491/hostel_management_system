import { useState, useEffect } from "react";
import Table from "../../UI/Table";

import { messApi } from "../../../utilities/serverConfigurations";

const columns = [
  { id: "name", label: "Name" },
  { id: "brand", label: "Brand" },
  { id: "desc", label: "Description" },
  { id: "category", label: "Category" },
];

const createData = (id, name, brand, desc, category) => {
  return { id, name, brand, desc, category };
};

const ItemTable = (props) => {
  const [rows, setRows] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const pageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const limitChangeHandler = (newLimit) => {
    setLimit(newLimit);
    setPage(0);
  };

  useEffect(() => {
    let arr = [];
    fetch(`${messApi}/item/?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        data.data.forEach((item) => {
          arr.push(
            createData(item.id, item.name, item.brand, item.desc, item.category)
          );
          setRows(arr);
        });
      });
  }, [page, limit]);

  return (
    <Table
      columns={columns}
      rows={rows}
      page={page}
      limit={limit}
      onPageChanged={pageChangeHandler}
      onLimitChanged={limitChangeHandler}
    />
  );
};

export default ItemTable;
