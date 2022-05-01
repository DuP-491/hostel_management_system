import * as React from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { messApi } from "./../../utilities/serverConfigurations";
import { unslugify } from "unslugify";

const filter = createFilterOptions();

const CategoryComboBox = React.forwardRef((props, ref) => {
  const [open, toggleOpen] = React.useState(false);
  const [categoryList, setCategoryList] = React.useState([]);

  React.useEffect(() => {
    let arr = [];
    fetch(`${messApi}/category/`)
      .then((response) => response.json())
      .then((res) => {
        res.data.forEach((category) => {
          category.name = unslugify(category.name);
          arr.push(category);
        });
      });
    setCategoryList(arr);
  }, []);

  const addNewCategory = (name, desc) => {
    fetch(`${messApi}/category/`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        desc: desc,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleClose = () => {
    setDialogValue({
      name: "",
      desc: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: "",
    desc: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setValue({
      name: dialogValue.name,
      desc: dialogValue.desc,
    });
    addNewCategory(dialogValue.name, dialogValue.desc);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={props.value}
        ref={ref}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                desc: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              desc: "",
            });
          } else {
            props.setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="category-combo-box"
        options={categoryList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any category in the list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="desc"
              value={dialogValue.desc}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  desc: event.target.value,
                })
              }
              multiline
              maxRows={10}
              label="Description"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
});

export default CategoryComboBox;
