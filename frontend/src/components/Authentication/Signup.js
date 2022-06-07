import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {BiShowAlt, BiHide} from 'react-icons/bi'
import axios from "axios"
import {useHistory} from 'react-router-dom'


const Signup = () => {
    // creating usestates for name email confirm password picture etc
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()
    const [img, setImg] = useState()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const history = useHistory();

        // this handleclick function will update the value of show, so that we can see the password 
    const handleClick =()=> setShow(!show)
    const postDetails= (images) => {
        setLoading(true);
        if (images === undefined){
            toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        return;
        //Doing the API fetch from Cloudinary
        }
        if(images.type==="image/jpeg" || images.type === "image/png" ){
            const data = new FormData();
            data.append("file", images);
            data.append("upload_preset", "Messenger")
            data.append("cloud_name", "gassembly")
            fetch("https://api.cloudinary.com/v1_1/gassembly/image/upload", {
                method: 'post',
                body: data,
            }).then((res)=> res.json())
            .then(data=>{
                setImg(data.url.toString())
                setLoading(false)
                console.log(setImg)
                // setLoading to false because our picture has been successfully uploaded
            })
            .catch((err) =>{
                console.log(err)
                setLoading(false)
            })
            //THIS is for when the user tries to upload something other than an Image
        }   else {
            toast({
            title: 'Select an Image',
            status: 'warning',
            duration: 5000,
            isClosable: true,
        })
        setLoading(false);
        return;
        }
    }
    const submitHandler = async () => {
        setLoading(true);
        //Check if all the fields are submitted
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please fill the fields",
                status:"warning",
                duration:5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
            return;
        }
        //check if the password doesnt match
        if(password !== confirmpassword){
            toast({
                title: "Password doesnt match",
                status:"warning",
                duration:5000,
                isClosable: true,
                position: "bottom",
            })
            return;
        }    
        // API request to store the data in our Database    
        try {
            const config = {
                headers:{
                    "Content-type": "application/json",
                },
            };
            // global variale with string intrepulation ${} for the backend 
            const { data } = await axios.post("http://localhost:3001/api/user", {name,email,password,img}, config)
            toast({
                title: "Registration Successful!",
                status:"success",
                duration:5000,
                isClosable: true,
                position: "bottom",
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            //If user has succesfuly registered, push to chat page
            //history is a hook 
            history.push('/chats')
        } catch (error) {
             toast({
                title: "Error",
                description: error.response.data.message,
                status:"error",
                duration:5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
        }
    }

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
                           {show ? <BiHide />: <BiShowAlt />}
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
                            {show ? <BiHide />: <BiShowAlt />}
                        </Button>
                    </InputRightElement>
                </InputGroup>         
        </FormControl>
        <FormControl id='img'>
            <FormLabel>Upload an Image</FormLabel>
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />         
        </FormControl>
        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup