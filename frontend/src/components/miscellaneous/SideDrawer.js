import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import {RiNotificationFill} from 'react-icons/ri'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user } = ChatState();
 
  return (
    <Box display="flex" justifyContent="space-between" alignItems='center' bg="white" opacity="0.3" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
      <Tooltip label="Search Users" hasArrow placement='bottom-end'>
       <Button variant="ghost"><AiOutlineSearch />
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
              <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  )
}

export default SideDrawer