import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const EditCar = props => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    price: ""
  });

  const handleClickOpen = () => {
    const { brand, model, color, year, price } = props.car;
    setCar({ brand, model, color, year, price });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  // Update car and close modal form
  const handleSave = () => {
    props.updateCar(car, props.link);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" size={"small"} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={car.year}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCar;
