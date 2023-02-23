import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name : yup.string().required(),
  profile : yup.string().required().min(4).url(),
  email : yup.string().required().min(10),
  slogan : yup.string().required().min(10),

})

export function AddUser() {  
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: " ",
      profile: " ",
      email: " ",
      slogan: " ",
    },
    validationSchema : formValidationSchema,
    onSubmit : (newUser) => {
      console.log("Form values",values);
      addUser(newUser);
    }
  });
  
  const addUser = async(newUser) => {

    
    await fetch("https://63d75fcdafbba6b7c93beca4.mockapi.io/users", {
      method: "POSt",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
    navigate("/user")
        console.log(newUser);
      }

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
      <TextField error={errors.profile && touched.profile} helperText={errors.profile && touched.profile ? errors.profile : null } value={values.profile} name="profile" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="profile" variant="outlined" />
      <TextField error={errors.email && touched.email} helperText={errors.email && touched.email ? errors.email : null } value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Email" variant="outlined" />
      <TextField error={errors.slogan && touched.slogan} helperText={errors.slogan && touched.slogan ? errors.slogan : null } value={values.slogan} name="slogan" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Slogan" variant="outlined" />
      <Button variant='outlined' type='submit'>Add User</Button>
    </form>
  );
}
