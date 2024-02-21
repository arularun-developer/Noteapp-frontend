import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Forgotpassword from './components/Forgotpassword'
import Resetpassword from './components/Resetpassword'
import View from './components/View'
import Createpage from './components/Createpage'
import Editpage from './components/Editpage'

function App() {

  return (
    <Router>
      
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/reset/:token' element={<Resetpassword />} />
          <Route path='/view' element={<View />} />
          <Route path='/Create' element={<Createpage />} />
          <Route path='/edit/:id' element={<Editpage />} />









        </Routes>

      </div>
    </Router>
  )
}

export default App
