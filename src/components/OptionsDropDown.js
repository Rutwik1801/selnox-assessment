import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';


const iconStyles={
  marginRight:"10px",color:"#7D7D7D"
}


function OptionsDropDown({employeeId,handleEmployeeDelete}) {
    const navigate=useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleDelete=()=>{
        setAnchorEl(null);
        handleEmployeeDelete(employeeId)
    }
  const handleEdit=()=>{
   navigate(`/employeesTable/${employeeId}`)
    setAnchorEl(null);
  }
  const handleView=()=>{
    setAnchorEl(null);
  }
    return (
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          disableElevation
          onClick={handleClick}
        >
          <IconButton>
            <MoreVert />
          </IconButton>
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleView} disableRipple>
            <RemoveRedEyeIcon sx={iconStyles} />
            <span style={{color:"#7D7D7D"}}>View</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleEdit} disableRipple>
            <EditIcon sx={iconStyles}/>
            <span style={{color:"#7D7D7D"}}>Edit</span>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleDelete} disableRipple>
            <DeleteIcon sx={iconStyles}/>
            <span style={{color:"#7D7D7D"}}>Delete</span>
          </MenuItem>
        </Menu>
      </div>
    );
}

export default OptionsDropDown