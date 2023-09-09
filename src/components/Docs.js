import React from 'react'
import { Link } from 'react-router-dom'

function Docs() {
  return (
    <div>
                <h1>
            Click on the links to view the pages 
        </h1>
 <Link to="/registrationForm">Create User</Link><br />
 <Link to="/employeesTable">Employees Table</Link><br />
 <Link to="/dropdown">Select Employee Dropdown</Link>

        <h1>
            Documentation
        </h1>
        <h3>
            Routes
        </h3>
        <h4>1.  "/registrationForm" :-to create a user (POST request)</h4>
        <h4>2.  "/dropdown" :- select employee dropdown</h4>
        <h4>3.  "/employeesTable" :- all employees in table (GET request) </h4>
        <h4>4.  "/employeesTable/:id"  (opens the same registration form but for updating the data instead of creating)</h4>
    </div>
  )
}

export default Docs