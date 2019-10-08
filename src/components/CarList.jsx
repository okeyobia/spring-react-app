import React, { Component } from "react";
import { SERVER_URL } from "../constants";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
const token = sessionStorage.getItem("jwt");
export default class CarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: []
    };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    fetch(SERVER_URL + "api/cars", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(resData => {
        this.setState({
          cars: resData._embedded.cars
        });
      })
      .catch(err => console.log(err));
  };

  addCar = car => {
    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(car)
    })
      .then(res => this.fetchCars())
      .catch(err => console.error(err));
  };

  // CarList.js file
  // Update car
  updateCar(car, link) {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(car)
    })
      .then(res => {
        toast.success("Changes saved", {
          position: toast.POSITION.TOP_CENTER
        });
        this.fetchCars();
      })
      .catch(err => {
        toast.error("Error when saving", {
          position: toast.POSITION.TOP_CENTER
        });
        console.log(err);
      });
  }

  onDelClick = link => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(link, {
        method: "DELETE",
        headers: { Authorization: token }
      })
        .then(res => {
          toast.success("Car deleted", {
            position: toast.POSITION.TOP_CENTER
          });
          this.fetchCars();
        })
        .catch(err => {
          toast.error("Error when deleting", {
            position: toast.POSITION.TOP_CENTER
          });
          console.log(err);
        });
    }
  };

  render() {
    const columns = [
      {
        Header: "Brand",
        accessor: "brand"
      },
      {
        Header: "Model",
        accessor: "model"
      },
      {
        Header: "Color",
        accessor: "color"
      },
      {
        Header: "Year",
        accessor: "year"
      },
      {
        Header: "Price ($)",
        accessor: "price"
      },
      {
        sortable: false,
        filterable: false,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <EditCar
            car={row}
            link={value}
            updateCar={this.updateCar}
            fetchCars={this.fetchCars}
          />
        ),
        width: 100
      },
      {
        id: "deletebtn",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",

        Cell: ({ value }) => (
          <Button
            onClick={() => {
              this.onDelClick(value);
            }}
            color="secondary"
            size="small"
          >
            Delete
          </Button>
        )
      }
    ];
    const { cars } = this.state;
    return (
      <div>
        <ToastContainer autoClose={1000} />
        <Grid container>
          <Grid item>
            <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
          </Grid>
          <Grid item style={{ padding: 15 }}>
            <CSVLink data={this.state.cars} separator={","}>
              Export CSV File
            </CSVLink>
          </Grid>
        </Grid>

        <ReactTable
          page={0}
          pageSize={10}
          data={cars}
          columns={columns}
          filterable={true}
        />
      </div>
    );
  }
}
