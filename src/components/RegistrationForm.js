import React,{useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import Heading from './Heading';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';


function RegistrationForm(props) {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const [studyField, setStudyField] = useState("");
  const [firsName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [dob,setDob]=useState("")
  const [salary,setSalary]=useState("")
  const [additionalInfo, setAdditionalInfo] = useState("");
const [startDate,setStartDate]=useState("")
const [endDate,setEndDate]=useState("")


    const params=useParams()
    const navigate=useNavigate()


    const getData=async()=>{
      setLoading(true)
        if(params.id!==undefined){
            const res=await fetch('https://sweede.app/DeliveryBoy/Get-Employee/');
            const data= await res.json();
            const employee=data.filter(value=>{
                return(value.id===parseInt(params.id))
            })
            setFirstName(employee[0].FirstName)
            setLastName(employee[0].LastName)
            setDob(employee[0].DOB)
            setSalary(employee[0].CurrentSalary)
            setStartDate(employee[0].StartDate)
            setEndDate(employee[0].EndDate)
            setAdditionalInfo(employee[0].Description)
            setStudyField(employee[0].Study)
        }
        setLoading(false)
    }
    useEffect(()=>{
    getData()
    },[])

    const textFieldStyles = {
        color:"#7E98BA",backgroundColor:"#F8FBFF",borderRadius:"16px",border:"1px solid #F8FBFF",
    };



  const handleFirstNameChange=(e)=>{
   setFirstName(e.target.value)
  }

  const handleLastNameChange=(e)=>{
setLastName(e.target.value)
  }
  const handleDobChange=(e)=>{
    setDob(e.target.value)
  }
  const handleSalaryChange=(e)=>{
    if(e.target.value<0){
      setSalary(0);
    }else{
      setSalary(e.target.value)
    }
  }
  const handleStudyFieldChange = (event) => {
    setStudyField(event.target.value);
  };

  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };
const handleEndDateChange=(e)=>{
setEndDate(e.target.value)
}
const handleStartDateChange=(e)=>{
    setStartDate(e.target.value)
}

const handleCancelClick=()=>{
  navigate("/employeesTable")
}
  const handleEmployeeSubmission=async ()=>{
    if(firsName==="" || lastName==="" || dob==="" || studyField==="" || startDate==="" || endDate==="" || salary===""){
      setError("Please fill all the fields");
    }else{
      const employeeObject={
        "id":1,
        FirstName:firsName,
        LastName:lastName,
        DOB:dob,
        Study:studyField,
        StartDate:startDate,
        EndDate:endDate,
        CurrentSalary:salary,
        Description:additionalInfo,
    }

    const api=params.id!==undefined?`https://sweede.app/DeliveryBoy/update-Employee/${params.id}`:"https://sweede.app/DeliveryBoy/Add-Employee/"
    const res=await fetch(api, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
          },
        body:JSON.stringify(employeeObject),
      });
      navigate("/employeesTable")
    }
  }

  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",padding:"50px 20px"}}>
     <Heading title="Employee Registration Form" alignment="center" />
     {
      loading===true?<Loader />:
      <Grid container spacing={2} xs={12} md={8} lg={6}>
      <Grid item xs={6}>
        <TextField
          label="First Name"
          required
          variant="outlined"
          InputProps={{
              style: textFieldStyles
            }}
          fullWidth
          margin="normal"
          value={firsName}
          onChange={handleFirstNameChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Last Name"
          variant="outlined"
          required
          fullWidth
          InputProps={{
              style: textFieldStyles
            }}
          margin="normal"
          value={lastName}
           onChange={handleLastNameChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
                    InputProps={{
                      style: textFieldStyles
                    }}
          label="Date of Birth"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dob}
          onChange={handleDobChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Start Date"
          InputProps={{
              style: textFieldStyles
            }}
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={startDate}
          onChange={handleStartDateChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="End Date"
          InputProps={{
              style: textFieldStyles
            }}
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={endDate}
          onChange={handleEndDateChange}
        />
      </Grid>
      <Grid item xs={12}>
      <TextField
                  InputProps={{
                      style: textFieldStyles
                    }}
          label="Salary"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={salary}
           onChange={handleSalaryChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
        <InputLabel  htmlFor="study-field">Study Field</InputLabel>
          <Select
            sx={{ color:"#7E98BA",backgroundColor:"#F8FBFF",borderRadius:"16px",border:"1px solid #F8FBFF",textAlign:"left"}}
            label="Study Field"
            variant="outlined"
            value={studyField}
            onChange={handleStudyFieldChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
                    InputProps={{
                      style: textFieldStyles
                    }}
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={additionalInfo}
          onChange={handleAdditionalInfoChange}
        />
      </Grid>
      {error===""?"":<p style={{color:"red"}}>{error}</p>}
      <Grid item xs={12} 
      sx={{display:"flex",flexDirection:{xs:"column",md:"row",justifyContent:"space-evenly",alignItems:{xs:"stretch",md:"center"}}}}
      >
        <Button onClick={handleCancelClick} variant='contained' 
        sx={{letterSpacing:"3px",backgroundColor:"#E3E3E3",color:"#263857",padding:"10px 50px"}}>
          Cancel
        </Button>
        <Button variant='outlined' onClick={handleEmployeeSubmission} 
        sx={{marginTop:{xs:"20px",md:0},letterSpacing:"3px",color:"#263857",border:"1px solid #263857",padding:"10px 50px"}}>
          Save
        </Button>
      </Grid>
    </Grid>
     }
    
    </div>
  );
}

export default RegistrationForm;
