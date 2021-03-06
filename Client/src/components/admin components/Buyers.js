import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import API_URL from './../../config'

function Buyers() {
  const [buyers, setBuyers] = useState([]);

  const columns = [
    { title: "Full name", field: "full_name" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "Address", field: "address" },
    { title: "Devise", field: "devise" },
    { title: "IsValid", field: "isValid" },
  ];
          useEffect(() => {
              setInterval(() => {
                fetchData()
              }, 1000);
          }, [])

          function fetchData() {
              axios.get(`${API_URL}/buyer/getAll`)
             .then(response =>{
                 const allBuyers = response.data
                 setBuyers(allBuyers)
                 console.table(allBuyers);
             }).catch(error =>{
                 console.log(error);
             })
         }

         async function deleteBuyer(id){
                await axios.delete(`${API_URL}/buyer/delete/${id}`)
                    .then(function(response){
                        fetchData()
                        toast.configure();
                        toast.success("Buyer deleted successfully")
                    }).catch(function(error){
                        console.log(error);
                    })
        }

  return (
    <div style={{width: '70%' , margin: 'auto'}}>
      <MaterialTable
        title="Buyers Table"
        columns={columns}
        data={buyers}
        options={{ 
            pageSize: 5,
            pageSizeOptions: [5,10],
          }}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete Buyer",
            onClick: (event, rowData) => {
              deleteBuyer(rowData._id);
            },
          },
        ]}
      />
    </div>
  );
}

export default Buyers;