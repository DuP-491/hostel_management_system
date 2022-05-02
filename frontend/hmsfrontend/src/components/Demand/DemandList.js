import * as React from "react";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { messApi } from "../../utilities/serverConfigurations";
import { useNavigate } from "react-router";
import FullScreenDialog from "../UI/FullScreenDialog";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const DemandList = (props) => {
  const [demands, setDemands] = React.useState([]);
  const [isAddOpen, setAddOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteId,setDeleteId] = React.useState();

  const {toLoad,setToLoad} = props;


  const handleClickOpen = (e,demandid) => {
    setOpen(true);
    setDeleteId(demandid);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const loadDemands = () => {
    let arr = [];
    fetch(`${messApi}/demand/`)
      .then((response) => response.json())
      .then((res) => {
        res.data.forEach((demand) => {
          demand.date = `${demand.date.split("T")[0]} ${
            demand.date.split("T")[1].split(".")[0]
          }`;
          arr.push(demand);
        });
        setDemands(arr);
      });
  }
  const handleDelete = () => {
    let options = {
      method: "DELETE",
      body: JSON.stringify({
        id: deleteId

      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    fetch(`${messApi}/demand/`,options)
    .then((apiData) => apiData.json())
    .then(data=>console.log(data))
    .then(setToLoad(!toLoad));
    setOpen(false);
  };
  const dialogToggleHandler = (event) => {
    setAddOpen((prev) => {
      return !prev;
    });
  };


  let navigate = useNavigate();
 
  React.useEffect(() => {
    loadDemands();
  }, [toLoad]);

  return (
    <>
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
                    <DeleteIcon id={demand.id} variant="outlined" onClick={(e)=>handleClickOpen(e,demand.id)} />
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete current demand list?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this demand list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DemandList;
