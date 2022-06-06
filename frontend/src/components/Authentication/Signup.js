import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
    // creating usestates for name email confirm password picture etc
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()
    const [img, setImg] = useState()
    const [show, setShow] = useState(false)

        // this handleclick function will update the value of show, so that we can see the password 
    const handleClick =()=> setShow(!show)
    const postDetails= () => {}
    const submitHandler = () => {}

  return (
    <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
                <Input placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
                <InputGroup>
                        {/* if text is true then show password when clicking show */}
                    <Input placeholder='Create a password' type={show? "text" : "password"} onChange={(e)=>setPassword(e.target.value)}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide": "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>         
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                        {/* if text is true then show password when clicking show */}
                    <Input placeholder='Confirm Password' type={show? "text" : "password"} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide": "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>         
        </FormControl>
        <FormControl id='img'>
            <FormLabel>Upload an Image</FormLabel>
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />         
        </FormControl>
        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}>
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup