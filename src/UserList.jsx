import { User } from "./User";
import { useState } from "react";
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export function UserList() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([])

  const getUser = () => {
    fetch("https://63d75fcdafbba6b7c93beca4.mockapi.io/users", {
        method: "GET",
      })
      .then((data) => data.json())
        .then((data)=>setUserList(data))
  }
  
  useEffect(() => getUser(), [])
  
  const deleteUser = (id) => {
    console.log("deleting the user,id");
    fetch(`https://63d75fcdafbba6b7c93beca4.mockapi.io/users/${id}`, {
      method: "DELETE"
    }).then(() => getUser());
  }

  return (
    <div>
      <div className="user-list">
        {userList.map((data) => (<User key={data.id} user={data} id ={data.id} deleteButton={<IconButton sx={{marginLeft:"auto"}} color="error" onClick={()=>deleteUser(data.id)}><DeleteIcon/></IconButton>} editButton={<IconButton sx={{marginLeft:"auto"}} color="secondary" onClick={()=>navigate(`/user/edit/${data.id}`)}><EditIcon/></IconButton>} />))}
      </div>
    </div>
  );
}
