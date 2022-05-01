import * as React from "react";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { messApi } from "../../utilities/serverConfigurations";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const DemandList = (props) => {
  const [demands, setDemands] = React.useState([]);

  let navigate = useNavigate();

  React.useEffect(() => {
    let arr = [];
    fetch(`${messApi}/demand/`)
      .then((response) => response.json())
      .then((res) => {
        res.data.forEach((demand) => {
          console.log(demand.date);
          demand.date = `${demand.date.split("T")[0]} ${
            demand.date.split("T")[1].split(".")[0]
          }`;
          console.log(demand.date);
          arr.push(demand);
        });
        setDemands(arr);
      });
  }, []);

  return (
    <Demo>
      <List dense={false}>
        {demands.map((demand) => {
          return (
            <ListItem
              key={demand.id}
              secondaryAction={
                <div>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      navigate(`./${demand.id}`, {
                        state: { demandId: demand.id },
                      });
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              }>
              <ListItemText
                primary={demand.date}
                secondary={`Items: ${demand.itemCount}, Amount: ${demand.totalAmount}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Demo>
  );
};

export default DemandList;
