import Home from './components/Home';
import CityLogin from './components/CityLogin'
import SuperLogin from './components/SuperLogin';
import CityDashboard from './components/CityDashboard';
import SuperDashboard from './components/SuperDashboard';
import CitySearch from './components/CitySearch';
import StudentProfile from './components/StudentProfile';
import AddStudent from './components/AddStudent';
import CityUpdateStudent from './components/CityUpdateStudent';
import FeeManagement from './components/FeeManagement';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path='/' element={<Home />} />
           <Route path='/city/login' element={<CityLogin />} />
           <Route path='/super/login' element={<SuperLogin />} />
           <Route path='/city/dashboard' element={ <CityDashboard /> } />
           <Route path='/super/dashboard' element={ <SuperDashboard /> } />
           <Route path='/city/search/:term' element={ <CitySearch /> } />
           <Route path='/student/profile/:id' element={ <StudentProfile /> } />
           <Route path='/city/add/student' element={ <AddStudent /> } />
           <Route path='/city/update/student/:id' element={ <CityUpdateStudent /> } />
           <Route path='/fee/management/:id' element={ <FeeManagement /> } />
       </Routes> 
      </BrowserRouter>/
    </div>
  );
}

export default App;

// theory of autometa : 78
// cloud computing : 76
// mobile application development : 76
