import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CursosPage from './Pages/Cursos'
import Navbar from './Components/Navbar'
import LoginPage from './Pages/LoginPage'
import TasksPage from './Pages/TasksPage'
import RegisterPage from './Pages/RegisterPage'
import { AuthProvider } from './Context/authContext'
import TaskFormPage from './Pages/TaskFormPage'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import { TaskProvider } from './Context/TaskContext'
import { CoursesProvider } from './Context/CoursesContext'
import ProtectedAdmin from './ProtectedRoutes/ProtectedAdmin'
import AdminPanel from './Pages/AdminPages/AdminPanel'
import UsersPage from './Pages/AdminPages/UsersPage'
import CoursesForm from './Pages/AdminPages/CoursesForm'
import CursosAdminPage from './Pages/AdminPages/CursosPage'
import UsersFormPage from './Pages/AdminPages/usersForm'
import NotFoundPage from './Pages/404/NotFound.jsx'
import ProfilePagetest from './Pages/profilePagetest.jsx'
import {CursoDatosPersonales, DatosPersonales,} from './Pages/DatosPersonales.jsx'
import { ToastContainer } from 'react-toastify'
import { InscripcionProvider } from './Context/inscripcionContext.jsx'
import {InscripcionesPage} from './Pages/AdminPages/InscripcionesPage.jsx'
import SobreNosotrosPage from './Pages/SobreNosotrosPage.jsx'
import TestDesign from './Pages/TestDesign.jsx'
import ContactanosPage from './Pages/ContactanosPage.jsx'
import { InscritosPage } from './Pages/AdminPages/InscritosPage.jsx'
import { StatesProvider } from './Context/useStateContext.jsx'
import Footer from './Components/Footer.jsx'





function App() {

  


  return (
    <>
  <Router>
    <StatesProvider>
  <InscripcionProvider>
      <AuthProvider>
        <TaskProvider>
          <CoursesProvider>

          
              <div className='fixed top-0 z-50' ><Navbar /></div>
              <div className=''> 
                <Routes >

                  <Route path='*' element={<NotFoundPage />} />
                  <Route path='/' element={<HomePage />} ></Route>
                  <Route path='/test' element={<TestDesign />} ></Route>
                  {/* <Route path='/test' element={<ProfilePagetest />} ></Route> */}
                  <Route path='/cursos' element={<CursosPage />}></Route>
                  <Route path='/login' element={<LoginPage />}></Route>
                  <Route path='/register' element={<RegisterPage />}></Route>
                  <Route path='/nosotros' element={<SobreNosotrosPage />}></Route>
                  <Route path='/contactanos' element={<ContactanosPage />}></Route>
                 
                 
                  <Route element={<ProtectedRoute/>}>
                    <Route path='/tasks' element={<TasksPage />}></Route>
                    <Route path='/add-task' element={<TaskFormPage />}></Route>
                    <Route path='/tasks/:id' element={<TaskFormPage />}></Route>
                    <Route path='/profile' element={<ProfilePagetest />}></Route>
                    <Route path='/datos/personales' element={<DatosPersonales />}></Route>
                    <Route path='/datos/personales/curso' element={<CursoDatosPersonales/>}></Route>
                  </Route>
                 
                  <Route element={<ProtectedAdmin />}>
                    <Route path='/admin/panel' element={<AdminPanel />}></Route>
                    <Route path='/admin/users' element={<UsersPage />}></Route>
                    <Route path='/admin/users/:id' element={<UsersFormPage />}></Route>
                    <Route path='/admin/cursos' element={<CursosAdminPage />}></Route>
                    <Route path='/add-cursos' element={<CoursesForm />}></Route>
                    <Route path='/cursos/:id' element={<CoursesForm />}></Route>
                    <Route path='/admin/inscripciones' element={<InscripcionesPage/>}></Route>
                    <Route path='/admin/inscritos' element={<InscritosPage/>}></Route>

                  </Route>
                  
                </Routes>
               
              </div>
                
                

              
          </CoursesProvider>
        </TaskProvider>
      </AuthProvider>
 
      <ToastContainer
    pauseOnFocusLoss={false}
     />
      </InscripcionProvider>
      </StatesProvider>
      <Footer/>

      </Router>
    

    </>
  )
}

export default App
