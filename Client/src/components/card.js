import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./prcard.css";

function Card({ match }) {
  const product_id = match.params.id;
  const [product, setProduct] = useState({});

  const [price, setPrice] = useState()

  const token = localStorage.getItem("token");

  const getProduct = async (product_id) => {
    await axios
      .get("http://localhost:5000/product/getProductById/" + product_id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct(product_id);
  }, [product_id]);

  return (
    <div>
      <div className="body_container">
        <section className="product">
          <div className="product__photo">
            <div className="photo-container">
              <div className="photo-main">
                <img src={`/uploads/${product.picture}`} />
              </div>
            </div>
          </div>
          <div className="product__info">
            <div className="title">
              <h2>Product Name</h2>
              <h1 style={{ color: "yellow" }}>{product.name}</h1>
            </div>
            <div className="price">
              <h2 style={{ color: "white" }}>Product Price</h2>
              <span style={{ color: "yellow" }}>{product.price}</span>
            </div>
            <div className="description">
              <h2>Description</h2>
              <div style={{ width: "100%" }}>
                <p style={{ color: "yellow" }}>{product.description}</p>
              </div>
            </div>
            {token ? (
              <button className="buy--btn" onClick={() => setPrice(product.price)}>Buy Now</button>
            ) : (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Sorry you cannot finsh the order,  to procced Sign in
              </div>
            )}
          </div>
          <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
        </section>
        
      </div>
    </div>
  );
}

export default Card;
