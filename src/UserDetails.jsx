import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export function UserDetails() {
  const { id } = useParams();
  // const User = userList[id];
  const navigate = useNavigate();

  const [user, setUser] = useState({})
  
  useEffect(() => {
    fetch(`https://63d75fcdafbba6b7c93beca4.mockapi.io/users/${id}`)
      .then((data) => data.json())
        .then((data)=>setUser(data))
  },[id])
  return (
    <div>
      <h3>Name : {user.name}</h3>
      <h3>Email : {user.email}</h3>
      <h3>Slogan : {user.slogan}</h3>
      <button onClick={() => navigate("/user")}>Back</button>
    </div>
  );
}

