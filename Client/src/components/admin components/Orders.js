import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'



export default function Orders() {

    const [orders, setOrders] = useState([])


          useEffect(() => {
              fetchData()
          }, [])

          function fetchData() {
              axios.get('http://localhost:5000/orders/getAll')
             .then(response =>{
                 const allOrders = response.data
                 setBuyers(allOrders)
                 console.table(allOrders);
             }).catch(error =>{
                 console.log(error);
             })
         }


    return (
        <div className="seller-container">
            <h1>Orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {buyers.map(buyer =>{
                      return <tr key={buyer._id}>
                      <td>{buyer.full_name}</td>
                      <td>{buyer.email}</td>
                      <td>{buyer.phone}</td>
                      <td><button onClick={() => deleteBuyer(buyer._id)}><DeleteIcon color="error"/></button></td>
                    </tr>
                    })
                  }

                </tbody>
            </Table>
                </div>

    )
}
