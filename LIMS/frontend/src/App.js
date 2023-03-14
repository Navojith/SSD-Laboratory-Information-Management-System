import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import PatientList from './pages/PatientList';
import PatientProfile from './pages/PatientProfile';
import EditPatientForm from './components/PatientComponents/EditPatientForm';
import CreatePatientForm from './components/PatientComponents/CreatePatientForm';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import PendingAccession from './pages/PendingAccession';
import Expenseslist from './pages/Expenseslist';
import Accessed from './pages/Accessed';
import TestData from './pages/TestData';
import SideNavBar from './components/SideNavComponent/SideNavBar';
import AddExpenses from './pages/AddExpenses';
import CreateTest from './pages/CreateTest';
import ViewTest from './pages/ViewTest';
import UpdateTest from './pages/UpdateTest';
<<<<<<< HEAD

import Machines from './pages/machineHistory';
=======
import Machines from './pages/machineHistory'
>>>>>>> 5517234b03a22426bba63de64e4e0f95e23506b0
import AddMachines from './pages/AddMachines';
import PendingTestResults from './pages/PendingTestResults';

// assets
import mediLineLogo from './assets/common/mediLineLogo.webp';
import AddBill from './pages/AddBill';
function App() {
  return (
    <div className="App">
      <HeaderComponent
        profileImgSrc={''}
        logoImgSrc={mediLineLogo}
        username={''}
      />
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-sm-3 col-md-2 col-lg-2">
              <SideNavBar />
            </div>
            <div className="col-9 col-sm-8 col-md-8 col-lg-8 mt-4">
              <div className="pages mt-5">
                <Routes>
                  <Route path="/patient-list" element={<PatientList />} />
                  <Route
                    path="/create-patient"
                    element={<CreatePatientForm />}
                  />
                  <Route
                    path="/patient-profile/:id"
                    element={<PatientProfile />}
                  />
                  <Route
                    path="/patient-profile/:id/addBill"
                    element={<AddBill />}
                  />
                  <Route
                    path="/patient-profile/:id/edit"
                    element={<EditPatientForm />}
                  />
                  <Route
                    path="/pendingAccession"
                    element={<PendingAccession />}
                  />

                  <Route path="/accessed" element={<Accessed />} />
                  <Route path="/machines" element={<Machines />} />
                  <Route path="/addMachines" element={<AddMachines />}></Route>

                  <Route path="/testData" element={<TestData />} />
                  <Route path="/createTest" element={<CreateTest />} />
                  <Route path="/viewTest/:id" element={<ViewTest />} />
                  <Route path="/updateTest" element={<UpdateTest />} />
                  <Route path="/expenseslist" element={<Expenseslist />} />
                  <Route path="/addExpenses" element={<AddExpenses />} />
                  <Route path="/expenseslist" element={<Expenseslist />} />
                
                  <Route
                    path="/accessed"
                    element={<Accessed />}
                  />
                  <Route path="/machines" element={<Machines />}/>
                  <Route path="/addMachines" element={<AddMachines/>}></Route>
                  
                  <Route
                    path='/testData'
                    element={ <TestData /> }
                  />
                  <Route
                    path='/createTest'
                    element={ <CreateTest /> }
                  />
                  <Route 
                    path='/viewTest/:id'
                    element={ <ViewTest /> }
                  />
                  <Route 
                    path='/updateTest'
                    element={ <UpdateTest /> }
                  />
                  <Route 
                    path="/expenseslist" 
                    element ={<Expenseslist/>}
                    />
                  <Route 
                    path="/addExpenses"
                    element ={<AddExpenses/>}
                    />
                  <Route 
                  path="/expenseslist" 
                  element ={<Expenseslist/>}
                  />
                  <Route
                    path="/pendingTests"
                    element={<PendingTestResults/>}
                  />
          </Routes>

              </div>
            </div>
            <div className="col-0 col-sm-1 col-md-2 col-lg-2"></div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
