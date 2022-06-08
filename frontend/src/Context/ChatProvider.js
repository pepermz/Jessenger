import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const ChatContext = createContext()

//This will wrap all of our app the children will be all of our app
const ChatProvider = ({ children }) => {
    //We want this state accessible throughout all the app
    const [user, setUser] = useState()
    const history = useHistory()

    useEffect(() =>{
       const userInfo = JSON.parse(localStorage.getItem("userInfo"))
       setUser(userInfo)

       // If user is not logged in it will redirect to login page
       if(!userInfo){
           history.pushState('/')
       }
    }, [history])

    return  <ChatContext.Provider value={{ user, setUser}}>{children}</ChatContext.Provider>;   
}

export const ChatState = () => {
    return useContext(ChatContext)
}



export default ChatProvider