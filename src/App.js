import { useEffect, useRef, useState } from "react";
import {Box,Button,Input, Container,VStack,HStack} from "@chakra-ui/react";
import Message from "./Components/Message";
import {onAuthStateChanged,  getAuth, GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";
import {app} from "./firebase";
import {getFirestore, addDoc, collection, serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore";
import { async } from "@firebase/util";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler =()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider);
}

const logoutHandler=()=>{
  signOut(auth);
}


function App() {
  const q = query(collection(db,"Messages"),orderBy("createdAt","asc"))
  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      SetMessage("");
    await addDoc(collection(db,"Messages"),{
      text:message,
      uid:user.uid,
      uri:user.photoURL,
      createdAt:serverTimestamp(),
    });

    divForScroll.current.scrollIntoView({behaviour:"smooth"})
    }

    catch(error){
     alert (error);
    }
  }
  const [user, SetUser] =useState(false);
  const [message,SetMessage] =useState("");
  const [messages,SetMessages] =useState([]);
  const divForScroll = useRef(null);
  useEffect (()=>{
     const unsubscribe = onAuthStateChanged(auth,(data)=>{
      SetUser(data);
    });

    const unsubscribeForMessages = onSnapshot(q,(snap)=>{
      SetMessages(
          snap.docs.map((item) =>{
            const id = item.id;
            return {id, ...item.data()};
          })
      );
    })

    //return statement is used for unmounting
   return ()=>{
    unsubscribe();
    unsubscribeForMessages();
   };
  },[])
 
  return <Box bg={"red.50"}>
    {
      user ? (
        <Container h={"100vh"} bg={"white"}>
       <VStack h={"full"} paddingY={"3"}>
         <Button onClick = {logoutHandler} colorScheme={"red"} w={"full"}>
           Logout
         </Button>

         <VStack  h={"full"} w={"full"} overflowY ="auto" css={{"&::-webkit-scrollbar":{
          display:"none"
         }}}>
           {
            messages.map(item=>(
              <Message key={item.id} user={item.uid===user.uid? "me" : "other"}text={item.text} uri={item.uri} />
            ))
           }
            <div ref={divForScroll}></div>
         </VStack>
         
         <form onSubmit ={submitHandler} style={{w:"100%"}}>
          <HStack>
          <Input value={message} onChange={(e)=>SetMessage(e.target.value)} placeholder="Enter a message..." />
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
