import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';
import RegistrationForm from './components/RegistrationForm';
import Dropdown from './components/Dropdown';
import Docs from './components/Docs';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Docs />} />
      <Route path="/employeesTable" element={<EmployeeTable />}  />
      <Route path="/employeesTable/:id" element={<RegistrationForm />}  />
      <Route path="/registrationForm" element={<RegistrationForm />} />
      <Route path='/dropdown' element={<Dropdown />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
