import React, { useEffect,useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Heading from './Heading';
import Loader from './Loader';


function Dropdown() {
    const [clearFlag,setClearFlag]=useState(false)
    const [items,setItems]=useState([])
    const [loading,setLoading]=useState(false)
    const [search,setSearch]=useState("")
    const [filteredData,setFilteredData]=useState([])

    const [checked, setChecked] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
  
    const getData=async()=>{
        setLoading(true)
        const res=await fetch('https://sweede.app/DeliveryBoy/Get-Employee/');
        const data= await res.json();
        const modifiedData=[]
         data.forEach(employee => {
            const modifiedEmployeeData={
                id:employee.id,
                name:`${employee.FirstName} ${employee.LastName}`,   
            }
            modifiedData.push(modifiedEmployeeData)
        setItems(modifiedData)
        setFilteredData(modifiedData)
        setLoading(false)
        });
    
    }
    useEffect(()=>{
        getData();
    },[])

    const handleSearchChange=(e)=>{
      if(e.target.value.length!==0){
        setClearFlag(true)
      }
        setSearch(e.target.value)
      const filteredItems=items.filter(item=>{
        return item.name.includes(e.target.value)
      })
      setFilteredData(filteredItems)
    }
   const handleClearClickChange=(e)=>{
    setSearch("");
    setClearFlag(false)
    setFilteredData(items)
   }
    const handleToggle = (index) => () => {
        const currentIndex = checked.indexOf(index);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(index);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    
      const handleSelectAll = () => {
        if (selectAll) {
          setChecked([]);
        } else {
          setChecked(filteredData.map((_, index) => index));
        }
        setSelectAll(!selectAll);
      };
    



    return (
        <div>
            <Heading title="Select Employee Dropdown" alignment="left" />
            {loading===true?<Loader />:
                  <Accordion sx={{width:"450px"}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                      <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"10px"}}>
                      <div style={{height:"30px",width:"30px",borderRadius:"50%",border:"1px solid black",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#142A51",color:"#DAE2EF",fontFamily:"Montserrat"}} >
                      {items.length}
                    </div>
                    <Typography sx={{fontFamily:"Montserrat"}}>All Employees</Typography>
                      </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: '#142A51',padding:"10px",borderRadius:"12px" }}>
                <TextField
                sx={{backgroundColor:"#1C3663",borderRadius:"12px"}}
                 value={search}
                 onChange={handleSearchChange}
                       InputProps={{
                          style:{fontFamily:"Montserrat",color:"#DAE2EF"},
                          startAdornment: (
                            <InputAdornment position="end" sx={{color:"#6F8BBC"}}>
                              <SearchIcon /> 
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <p onClick={handleClearClickChange}>{clearFlag===true?"CLEAR":""}</p>
                          )
                        }}
              placeholder='search employees'
                fullWidth
                />
                <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px",padding:" 5px 5px 5px 15px"}}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div style={{color:"#DAE2EF",backgroundColor:"#1C3663", height:"30px",width:"30px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center"}} >
                      {items.length}
                    </div>
                    <p style={{color:"#DAE2EF",marginLeft:"10px"}}>Select All</p>
                    </div>
                    <Checkbox
        checked={selectAll}
        onChange={handleSelectAll}
      /></div>
                </div>
                  {filteredData.map((item,index) => {
                    const labelId = `checkbox-list-secondary-label-${item.id}`;
                    return (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(index)}
                            checked={checked.indexOf(index) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                              <div style={{backgroundColor:"#1C3663", height:"30px",width:"30px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                  <p style={{textTransform:"uppercase",color:"#DAE2EF"}}>{item.name[0]}</p>
                              </div>
                          </ListItemAvatar>
                          <ListItemText id={item.id} primary={item.name}  sx={{color:"#DAE2EF"}} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
          
                  </AccordionDetails>
                </Accordion>
            }


      </div>
    );
}

export default Dropdown
