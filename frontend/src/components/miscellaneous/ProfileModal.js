import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import {BiShowAlt} from 'react-icons/bi'
import React from 'react'

const ProfileModal = ({user, children}) => {
    // We are taking the children and putting them inside the return div containing the users profile
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    {/* If there are children  this is how we display when clicking the show button */}
     {children ? (
         <span onClick={onOpen}>{children}</span>
     ) : (
         <IconButton 
         display={{ base: "flex"}}
         icon={<BiShowAlt />}
         onClick={onOpen}
         />
     )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="400px">
          <ModalHeader fontSize="40px" display="flex" justifyContent="center">{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between" >
              <Image borderRadius="full" boxSize="150px" src={user.img} alt={user.name}/>
              <Text fontSize={{ base: "28px", md: "30px"}}>Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal