'use client'

import { Stack } from "@mui/material";
import Image from "next/image";
import { mainModule } from "process";
import { useActionState, useState } from "react";


export default function Home() {

  const [messages, setMessages] = useState({


    role: 'Assistant',
    content: `hi, I am the Customer Support Chat Bot. How can I assist you today?`,
  })

  const [messages, setMessages] = useState('')

  return (<Box width = "100vw"
     height = "50vh"
      display= "flex"
       flexDirection="column"
      justifyContent="center"
      alignItems="center"
       >
  // stack for messages
        <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={2}
      >


      
        < Stack
          direction="column"
          width="600px"
          height="700px"
          overflow="auto"
          border="1px solid black"
          maxHeight="100%"
     

      >

        {
          messages.map((message, index))=> {
            <Box 
            key = {index}
             display= "flex" 
             justifyContent={
              messages.role ==== 'assistant'? 'flex-start' : 'flex-end'
            }
            >

          

          }
        }>
        <Box
        bgcolor={
          message.role=== 'assistant'
          ? 'primary.main'
          :'secondary.main'
        }

        color="white"
        borderRadius ={16}
        p={3}

        > 
        {message.content}
        </Box>
        
      </Stack>
      </Stack>
       </Box>
      )
}