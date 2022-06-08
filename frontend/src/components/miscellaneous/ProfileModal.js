import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import {BiShowAlt, BiHide} from 'react-icons/bi'
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" display="flex" justifyContent="center">{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              wertyuiokjhgfds
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal