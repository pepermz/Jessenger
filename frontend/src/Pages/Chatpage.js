import { Box } from '@chakra-ui/react'
import ChatBox from '../components/ChatBox'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import { ChatState } from '../Context/ChatProvider'

const Chatpage = () => {
  const {user} = ChatState()

  return (
    <div style ={{width: "100%"}}>
      {/* check if the user is there only then render the side drawer */}
       {user && <SideDrawer/>}
       <Box display="flex" justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
         {/* only render if user is found */}
         {user && <MyChats/>}
         {user && <ChatBox/>}
       </Box>
    </div>
  )
}

export default Chatpage