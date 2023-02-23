import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const formValidationSchema = yup.object({
  name : yup.string().required(),
  profile : yup.string().required().min(4).url(),
  email : yup.string().required().min(10),
  slogan : yup.string().required().min(10),

})

export function EditUser() {  
  const { id } = useParams();
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch(`https://63d75fcdafbba6b7c93beca4.mockapi.io/users/${id}`)
      .then((data) => data.json())
        .then((data)=>setUser(data))
  }, [id])
  console.log(user);
  return (
    user ? <EditUserForm user={user} /> :  <div className='loading'><CircularProgress /></div>
  );
}

function EditUserForm({ user }) {
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: user.name,
      profile:user.profile,
      email: user.email,
      slogan: user.slogan,
    },
    validationSchema : formValidationSchema,
    onSubmit : (updateUser) => {
      console.log("Form values",values);
      editUser(updateUser);
    }
    });
    const editUser = async (updateUser) => {
    
   await fetch(`https://63d75fcdafbba6b7c93beca4.mockapi.io/users/${user.id}`, {
      method : "PUT",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
    navigate("/user")

        console.log(updateUser); 
      }
    return (
     <form onSubmit={handleSubmit} className="add-user-form">
       <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
       <TextField error={errors.profile && touched.profile} helperText={errors.profile && touched.profile ? errors.profile : null } value={values.profile} name="profile" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="profile" variant="outlined" />
       <TextField error={errors.email && touched.email} helperText={errors.email && touched.email ? errors.email : null } value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Email" variant="outlined" />
       <TextField error={errors.slogan && touched.slogan} helperText={errors.slogan && touched.slogan ? errors.slogan : null } value={values.slogan} name="slogan" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Slogan" variant="outlined" />
       <Button variant='outlined' color='success' type='submit'>Save</Button>
     </form>
  );
}