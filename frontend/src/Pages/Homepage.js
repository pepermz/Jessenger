import React, { useEffect } from 'react'
import { Box, Container, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom'


const Homepage = () => {
  const history = useHistory()

  useEffect(()=>{
    //Checking if the user is there if so push to the chat page
    const user = JSON.parse(localStorage.getItem("userInfo"))

    if(user)history.push('/chats')
  },[history])





  return (
    <Container maxW='xl' centerContent>
      {/* adding inline styling */}
      {/* d = display p = padding bg = background w= width m= margin */}
      <Box d='flex' justifyContent='center' p={3} bg={'white'} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Text fontSize="1xl" textAlign='center'>Jesenger</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs absvariant='enclosed'>
          <TabList mb='1em'>
            <Tab width="50%">Log In</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage