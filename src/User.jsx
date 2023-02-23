import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InfoIcon from '@mui/icons-material/Info';
import {useNavigate} from "react-router-dom"
import CardActions from '@mui/material/CardActions';

export function User({ user, id,deleteButton,editButton }) {
  // console.log(id);
  // console.log(user);
  const [show, setshow] = useState(true);
  const navigate = useNavigate();
  return (
    <Card className="user-container">
      <img src={user.profile} alt="" className="user-profile" />
      <CardContent>
        <h3>{user.name}
          <IconButton color='primary' onClick={() => setshow(!show)}>{show ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton>
          <IconButton color='primary' onClick={()=> navigate(`/user/${id}`)}><InfoIcon/></IconButton>
        </h3>
        {show ? <p>{user.email}</p> : null}
        {show ? <p>{user.slogan}</p> : null}
      </CardContent>
      <CardActions>
        { editButton }{ deleteButton }
      </CardActions>
    </Card>
  );
}
