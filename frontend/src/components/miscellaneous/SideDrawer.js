import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import {RiNotificationFill} from 'react-icons/ri'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import {useDisclosure} from '@chakra-ui/hooks'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
// import { accessChat } from '../../../../backend/controllers/chatControllers'
import UserListItem from '../UserAvatar/UserListItem'
import { Input } from "@chakra-ui/input";

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user } = ChatState();
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()


  //Logout Logic
  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    history.push("/")
  }

  const toast = useToast()
  //HandleSearch Functionality to search for user
  const handleSearch= async() => {
     //Check if there is anything inside of the search
     if(!search){
       toast({
         title: "Please enter a name or an email",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "top-left",
       })
       return
     }
     //API call for searching the user using the proper headers and axios
     try {
       setLoading(true)
       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         }
       }
       //Api call 
       const {data} = await axios.get(`/api/user?search=${search}`, config)
       //Setting the usestates to false
       setLoading(false)
       setSearchResult(data)
     } catch (error) {
       toast({
         title:"Error Occured",
         description:"Failed to search",
         status:"error",
         duration: 5000,
         isClosable: true,
         position: "bottom-left",
       })
     }
  }
  // This logic will allow us to access chats with the searched user
  const accessChat = (userId) => {

  }

  return (
    <>
    <Box display="flex" justifyContent="space-between" alignItems='center' bg="white" opacity="0.3" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
      <Tooltip label="Search Users" hasArrow placement='bottom-end'>
       <Button variant="ghost" onClick={onOpen}><AiOutlineSearch />
       <Text display={{base:"none", md: "flex"}}px="4" color="black" opacity="10">
         Search User
       </Text>
       </Button> 
      </Tooltip>
      <Text fontSize="2xl">
          Jessenger
      </Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <RiNotificationFill fontSize="2xl" m="1"/>
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<BiChevronDown />}>
            <Avatar size='sm' cursor="pointer" name={user.name} src={user.img}/>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              {/* <MenuItem>My Profile</MenuItem> */}
            </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
    <Drawer placement='left'onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="snow">
        <DrawerHeader borderBottomWidth="1px" >Search Users</DrawerHeader>
      <DrawerBody>
        <Box display="flex" pb={2}>
          <Input
            placeholder='Search by name or email'
            mr={2}
            value={search}
            //This setSearch allows us to search what is entered
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            //Function that handles search functionality on click 
            onClick={handleSearch}
          >Go</Button>
        </Box>
        {loading? (
          <ChatLoading />
        ):(
          //This maps through the results and looks by the id
          searchResult?.map((user) => (
            <UserListItem 
            key={user._id}
            user={user}
            handleFuncrion = {() =>accessChat(user._id)}
            />
          ))
        )}
      </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer