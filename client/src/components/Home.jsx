import React,{useContext} from 'react'
import { UserContext } from '../context/userContext'

export const Home = () => {
  const {user} = useContext(UserContext)
  return (
    <div>
      <h1>Hello Welcome To the world of Developers🔥</h1>
      {!!user && (<h2>Hi Buddy!</h2>)}
    </div>
  )
}
