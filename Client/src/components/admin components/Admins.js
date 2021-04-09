// import React,{useState,useEffect} from 'react'
// import jwt from 'jwt-decode'
// import access from '../../../src/img/access.jpg'
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import {useForm} from 'react-hook-form';
// import axios from 'axios';
// import { store } from 'react-notifications-component';
// import Table from 'react-bootstrap/Table'
// import DeleteIcon from '@material-ui/icons/Delete';



// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(2),
//         width: '35ch',
//       },
//     },
//   }));
// export default function Admins() {
//     const classes = useStyles();
//     const {register,handleSubmit} = useForm()
//     const token = localStorage.getItem('token')
//     const isSuperAdmin = jwt(token).superAdmin
//     const [admins, setAdmins] = useState([])

//     const onSubmit = async (data) =>{

//      await axios.post('http://localhost:5000/admin/add',{
//         full_name: data.full_name,
//         email: data.email,
//         phone: data.phone,
//         password: data.password,
//         address: data.address,
//      })
//         .then(function (response) {
//             fetchData()
//             store.addNotification({
//                 title: "Success !",
//                 message: "Admin Added",
//                 type: "success",
//                 insert: "top",
//                 container: "bottom-right",
//                 animationIn: ["animate__animated", "animate__fadeIn"],
//                 animationOut: ["animate__animated", "animate__fadeOut"],
//                 dismiss: {
//                     duration: 5000,
//                     onScreen: true
//                 }
//                 });

//           })
//           .catch(function (error) {
//             console.log(error);
//     })
//     }

//     useEffect(() => {
//         fetchData()
//     }, [])

//    async function fetchData() {
//       await axios.get('http://localhost:5000/admin/getAll')
//        .then(response =>{
//            const allAdmins = response.data
//            setAdmins(allAdmins)
//        }).catch(error =>{
//            console.log(error);
//        })
//    }

//     async function deleteAdmin(id){
//         await axios.delete('http://localhost:5000/admin/deleteAdmin/'+id)
//                     .then(function(response){
//                     fetchData()
//                     store.addNotification({
//                     title: "Success !",
//                     message: "Admin Deleted",
//                     type: "success",
//                     insert: "top",
//                     container: "bottom-right",
//                     animationIn: ["animate__animated", "animate__fadeIn"],
//                     animationOut: ["animate__animated", "animate__fadeOut"],
//                     dismiss: {
//                         duration: 5000,
//                         onScreen: true
//                     }
//                     });
//                     })
//                     .catch(function(error){
//                     console.log(error);
//         })
//     }


//     return (
//         <>
//             {isSuperAdmin ? (
//             <div className="admins-container" >
//                 <h1 style={{textAlign:'center'}}>Add Admin</h1>
//                 <div className="add-admin-form">
//                     <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
//                         <TextField name="full_name" label="Full Name" variant="outlined" inputRef={register} />
//                         <TextField name="email" label="Email" variant="outlined" inputRef={register} />
//                         <TextField name="phone" label="Phone" variant="outlined" inputRef={register} />
//                         <TextField name="password" label="Password" type="password" variant="outlined" inputRef={register} />
//                         <TextField name="address" label="Address" variant="outlined" inputRef={register} />
//                         <Button variant="contained" color="primary" type="submit">Add Admin</Button>
//                     </form>
//                 </div>
//                 <h1 style={{textAlign:'center'}}>Admins List</h1>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                             <th>Full name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                         {admins.map(admin =>{
//                             return <tr key={admin._id}>
//                             <td>{admin.full_name}</td>
//                             <td>{admin.email}</td>
//                             <td>{admin.phone}</td>
//                             <td>{admin.address}</td>
//                             <td><button onClick={() => deleteAdmin(admin._id)}><DeleteIcon color="error"/></button></td>
//                             </tr>
//                             })
//                         }
//                         </tbody>
//                     </Table>
//             </div>
//             ) : (
//                 <div className="admins-container">
//                     <img src={access} alt="" />
//                 </div>
//             )}
//         </>
//     )
// }
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from 'jwt-decode'
import access from '../../../src/img/access.jpg'
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "94%",
    },
  },
}));

export default function Admins() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const token = localStorage.getItem('token')
    const isSuperAdmin = jwt(token).superAdmin
    const [admins, setAdmins] = useState([])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // clearing data after adding an ads
  const clearInputs = () => {
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#endDate").value = "";
    document.querySelector("#startDate").value = "";
    document.querySelector("#picture").value = "";
  };
     const onSubmit = async (data) =>{
     console.log(data);
     await axios.post('http://localhost:5000/admin/add',{
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
     })
        .then(function (response) {
            fetchAdmins()
            handleClose()
            toast.configure();
            toast.success("Admin added successfully")

          })
          .catch(function (error) {
            toast.configure();
            toast.success(error.response.data)
            console.log(error.response.data);
    })
    }

    useEffect(() => {
        fetchAdmins()
    }, [])

   async function fetchAdmins() {
      await axios.get('http://localhost:5000/admin/getAll')
       .then(response =>{
           const allAdmins = response.data
           setAdmins(allAdmins)
       }).catch(error =>{
           console.log(error);
       })
   }
   console.log(admins);
    async function deleteAdmin(id){
        await axios.delete('http://localhost:5000/admin/deleteAdmin/'+id)
                    .then(function(response){
                    fetchAdmins()
                    toast.configure();
                    toast.success("Admin deleted successfully")
                    })
                    .catch(function(error){
                    console.log(error);
        })
    }

  return (
    <>
    {isSuperAdmin ? (
       <div className="admins-container">
      <Button style={{width: '70%'}}variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new admin
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ textAlign: "center" }}
          id="alert-dialog-slide-title"
        >
          {"Add new admins"}
        </DialogTitle>
        <DialogContent>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
              <TextField name="full_name" label="Full Name" variant="outlined" inputRef={register} />
              <TextField name="email" label="Email" variant="outlined" inputRef={register} />
              <TextField name="phone" label="Phone" variant="outlined" inputRef={register} />
              <TextField name="password" label="Password" type="password" variant="outlined" inputRef={register} />
              <TextField name="address" label="Address" variant="outlined" inputRef={register} />
              <Button variant="contained" color="primary" type="submit">Add Admin</Button>
        </form>
        </DialogContent>
      </Dialog>
      <br/>
      <div style={{width: '70%' , margin: 'auto'}}>
        <MaterialTable
            title="Admins Table"
            columns={[
                { title: 'Full name', field: 'full_name'},
                { title: 'Email', field: 'email' },
                { title: 'Phone', field: 'phone' },
                { title: 'Address', field: 'address',},
                
            ]}
            data={admins}    
            actions={[
                {
                  icon: "delete",
                  tooltip: "Delete Buyer",
                  onClick: (event, rowData) => {
                    deleteAdmin(rowData._id);
                  },
                },
              ]}    
        />
      </div>
    </div>
      ) : (
      <div className="admins-container">
         <img src={access} alt="" />
     </div>
     )}
    </>
)
  
}
