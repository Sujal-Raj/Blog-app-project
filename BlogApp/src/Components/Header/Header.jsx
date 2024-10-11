import React from 'react'
import Container from '../container/container'
import Logout from './Logout'
import  { Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
  const authStatus = useSelector(state => state.auth)
  const navigate = useNavigate()

const navItems = [
  {
  name:"Home",
  slug:"/",
  active : true,
},
{
  name:"Login",
  slug:"/login",
  active : false,
},
{
  name:"Signup",
  slug:"/signup",
  active : !authStatus,
},
{
  name:"All-posts",
  slug:"/all-posts",
  active : authStatus,
},
{
  name:"Add-Post",
  slug:"/add-post",
  active : authStatus,
},
]

  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to="/">
            {/* img  */}
            </Link>
          </div>
          <ul>
            {navItems.map((item)=>{
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={()=>{navigate(item.slug)}}
                  >{item.name}</button>
                </li>
                ): null
            })}
            {authStatus && (
              <li key="logout">
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header