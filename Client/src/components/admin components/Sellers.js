import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import API_URL from './../../config'

function Sellers() {
  const [sellers, setSellers] = useState([]);

  const columns = [
    { title: "Full name", field: "full_name" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "Address", field: "address" },
    { title: "Fiscal identity", field: "identity" },
    { title: "IsValid", field: "isValid" },
  ];
          useEffect(() => {
              setInterval(() => {
                fetchSellers()
              }, 1000);
          }, [])

          function fetchSellers() {
              axios.get(`${API_URL}/seller/getAll`)
             .then(response =>{
                 const allSellers = response.data
                 setSellers(allSellers)
                 console.table(allSellers);
             }).catch(error =>{
                 console.log(error);
             })
         }

         async function deleteSeller(id){
    await axios.delete(`${API_URL}/seller/delete/${id}`)
               .then(function(response){
                fetchSellers()
                toast.configure();
               toast.error("Seller deleted successfully")
               })
               .catch(function(error){
                 console.log(error);
               })
}

async function validateSeller(id) {

    const token = localStorage.getItem('token')
    console.log(token);
    axios.patch(`${API_URL}/seller/validate`,{
        id_seller : id,
     }
    //,{
    //     headers:{
    //         "auth-token": token
    //       }
    )
    .then(function (response) {
        fetchSellers()
        toast.configure();
        toast.success("Seller Account validated successfully")
       
      })
      .catch(function (error) {
        
        console.log(error.response.data);
      });

     
}
  return (
    <div style={{width: '70%' , margin: 'auto'}}>
      <MaterialTable
        title="Sellers Table"
        columns={columns}
        data={sellers}
        options={{ 
            pageSize: 5,
            pageSizeOptions: [5,10],
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete Seller",
              onClick: (event, rowData) => {
                deleteSeller(rowData._id);
              },
            },
            {
              icon: "edit",
              tooltip: "Validate Seller Account",
              onClick: (event, rowData) => {
                validateSeller(rowData._id);
              },
            },
          ]}
      />
    </div>
  );
}

export default Sellers;