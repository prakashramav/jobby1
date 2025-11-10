import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Routes>
      <Route  path='/login' element={<Login/>} />
      <Route  path='/' element={<ProtectedRoute>
        <Home />
        </ProtectedRoute>} />
      <Route  path='/jobs' element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route  path='/jobs/:id' element={<ProtectedRoute><JobDetails/></ProtectedRoute>} />
      <Route path='/not-found' element={<NotFound/>} />
      <Route path='*' element={<Navigate to="/not-found" replace />} />
    </Routes>
  </>
)

export default App
