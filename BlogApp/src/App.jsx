import React  from 'react';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './Appwrite/auth';
import { login,logout } from './Store/authslice';
// import Header from './Components/Header';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser().then((userData)=>{ if(userData) {
      dispatch(login({userData}))
    }
    else {
      dispatch(logout())
    }
  })
    .finally(()=> setLoading(false))
  },[])

  // return (
  //  <>
  //   <h1>Hello</h1>
  //  </>
  // )

  if(loading){
    return <h1>Loading...</h1>
  }
  else {
    return (
      <div className="main min-h-screen w-full bg-gray-700">
        <div className="header">
          <Header/>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
