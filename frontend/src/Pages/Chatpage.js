import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chatpage = () => {
    //Using useState to store the `data` inside `chats` and updating with `setChats`
    const [chats, setChats] = useState([])
    const fetchChats = async() => {
        const {data} = await axios.get('/api/chat');
        setChats(data)
    }

    useEffect(() => {
        fetchChats()
    }, [])

  return (
    <div>
        {/* mapping through the data into chatName */}
        {chats.map(chat => <div key={chat._id}>{chat.chatName}</div>)}
    </div>
  )
}

export default Chatpage