import {Box,Button,Input, Container,VStack,HStack} from "@chakra-ui/react";
import Message from "./Components/Message";
import { useEffect, useState } from "react";
import {onAuthStateChanged,  getAuth, GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";
import {app} from "./firebase";


const auth = getAuth(app)

const loginHandler =()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider);
}

const logoutHandler=()=>{
  signOut(auth);
}

function App() {
  const [user, SetUser] =useState(false);
  useEffect (()=>{
     const unsubscribe = onAuthStateChanged(auth,(data)=>{
      SetUser(data);
    });

    //return statement is used for unmounting
   return ()=>{
    unsubscribe();
   }
  })
 
  return <Box bg={"red.50"}>
    {
      user ? (
        <Container h={"100vh"} bg={"white"}>
       <VStack h={"full"} paddingY={"3"}>
         <Button onClick = {logoutHandler} colorScheme={"red"} w={"full"}>
           Logout
         </Button>

         <VStack  h={"full"} w={"full"} overflowY ="auto">
           <Message text={"sample message"}/>
           <Message user ="me" text={"sample message"}/>
           <Message text={"sample message"}/>
         </VStack>
         
         <form style={{w:"100%"}}>
          <HStack>
          <Input placeholder="Enter a message..." />
          <Button colorScheme={"purple"} type="Submit">Send</Button>
          </HStack>
         </form>
       </VStack>
    </Container>
      ) : <VStack  bg ="white" justifyContent ={"center"} h="100vh">
        <Button onClick ={loginHandler} height ={"1.5rem"} width={"10rem"}colorScheme={"purple"}>Sign In With Google</Button>
      </VStack>
    }
  </Box>
}

export default App;
