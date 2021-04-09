import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));
export default function Categories() {

    const token = localStorage.getItem('token')
    const classes = useStyles();
    const {register,handleSubmit} = useForm('')
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')


          useEffect(() => {
              fetchData()
          }, [])

          function fetchData() {
              axios.get('http://localhost:5000/category/getAll')
             .then(response =>{
                 const allCategories = response.data
                 setCategories(allCategories)
             }).catch(error =>{
                 console.log(error);
             })
         }


    const onSubmit = (data) =>{
        if(data.name){
          axios.post('http://localhost:5000/category/addCategory',{
            name : data.name,
        })
        .then(function (response) {
          fetchData()
            store.addNotification({
                title: "Success !",
                message: "Category Added",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
          })
          .catch(function (error) {
             store.addNotification({
                title: "Error !",
                message: error.response.data,
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
            console.log(error.response.data);
          });
        }else{
          store.addNotification({
            title: "Error !",
            message: "Name is empty",
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
    }

    const updateCategory = async (id) => {
          await axios.put('http://localhost:5000/category/updateCategory/'+id,{
            name : name
          },{
            headers:{
                "auth-token": token
              }
        })
          .then(function(response){
          fetchData()
          store.addNotification({
            title: "Success !",
            message: "Category updated",
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
          })
          .catch(function(error){
            console.log(error);
          })
    }

   async function deleteCategory(id){
        await axios.delete('http://localhost:5000/category/deleteCategory/'+id)
                   .then(function(response){
                    fetchData()
                    store.addNotification({
                      title: "Success !",
                      message: "Category Deleted",
                      type: "success",
                      insert: "top",
                      container: "bottom-right",
                      animationIn: ["animate__animated", "animate__fadeIn"],
                      animationOut: ["animate__animated", "animate__fadeOut"],
                      dismiss: {
                        duration: 5000,
                        onScreen: true
                      }
                    });
                   })
                   .catch(function(error){
                     console.log(error);
                   })
    }

    return (
        <div className="category-container">
            <h1>Add or Update Category</h1>
            <div className="add-category-form">
                <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <TextField  name="name" variant="outlined" label="Category Name" inputRef={register} onChange={e=> setName(e.target.value)}/>
                    <Button variant="contained" color="primary" type="submit">Add</Button>
                </form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                  {categories.map(category =>{
                      return <tr key={category._id}>
                      <td>{category.name}</td>
                      <td> <button onClick={() => updateCategory(category._id)}><UpdateIcon color="primary"/></button> </td>
                      <td> <button onClick={() => deleteCategory(category._id)}><DeleteIcon color="error"/></button></td>
                    </tr>
                    })
                  }
                </tbody>
                </Table>
                </div>

    )
}
