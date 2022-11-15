import {Box,Button,Input, Container,VStack,HStack} from "@chakra-ui/react";


function App() {
  return <Box bg={"red.50"}>
    <Container h={"100vh"} bg={"white"}>
       <VStack h={"full"} paddingY={"3"}>
         <Button colorScheme={"red"} w={"full"}>
           Logout
         </Button>

         <VStack  h={"full"} w={"full"}></VStack>

         <form style={{w:"100%"}}>
          <HStack>
          <Input placeholder="Enter a message..." />
          <Button colorScheme={"purple"} type="Submit">Send</Button>
          </HStack>
         </form>
       </VStack>
    </Container>
  </Box>
}

export default App;
