import React, { useState, useEffect } from "react";
import axios from "axios";
import "./single_card.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Product_page() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [ad, setAd] = useState([]);
  const [currency, setCurrency] = useState([]);
  const cur = localStorage.getItem("devise");
  useEffect(() => {
    getRandomAdd();
    getProducts();
    currencyChange();
  }, []);

  async function getRandomAdd() {
    await axios
      .get("http://localhost:5000/ads/getOne")
      .then((response) => {
        const randomAdd = response.data[0];
        setAd(randomAdd);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getProducts() {
    await axios
      .get("http://localhost:5000/product/getAll")
      .then((response) => {
        const allProducts = response.data;
        setProducts(allProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function currencyChange() {
    //  console.log(curr);
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=785557596904232c17239a2ba79e8e76"
      )
      .then((response) => {
        const data = response.data.rates;
        if (cur) {
          var to = data[cur];
          setCurrency(to);
        } else {
          var to = data.EUR;
          setCurrency(to);
        }
        console.log(data);
        // return data
      })
      .catch((err) => console.log(err));
  }

  async function findSingleProduct(id) {
    await axios
      .get("http://localhost:5000/product/" + id)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      {/* <div>
        <img
          style={{
            width: "57%",
            margin: "auto",
            height: "29vh",
            marginTop: "10px",
            boxShadow: "0px 0px 0px 3px blue",
          }}
          src={`/uploads/${ad.picture}`}
          alt="adds panner"
        />
      </div> */}
      <br />
      <div className="products_show_container">
        {products.map((product) => {
          return (
            <div className="body_single_card">
              <div className="container page-wrapper">
                <div className="page-inner">
                  <div className="row">
                    <div className="el-wrapper">
                      <div className="box-up">
                        <img
                          className="img"
                          src={`/uploads/${product.picture}`}
                          alt
                        />
                        <div className="img-info">
                          <div className="info-inner">
                            <span className="p-company">{product.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="box-down">
                        <div className="h-bg">
                          <div className="h-bg-inner" />
                        </div>
                        <Link to={`/Product/${product._id}`}>
                          <a className="cart">
                            <span className="price">
                              {Number(product.price * currency).toFixed(2)}
                            </span>
                            <span className="add-to-cart">
                              <span className="txt">Show more details</span>
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
