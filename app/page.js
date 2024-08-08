'use client'

import { Box, Stack } from "@mui/material";
import { useState } from "react";


export default function Home() {

  const [messages, setMessages] = useState([{
    role: 'Assistant',
    content: `Hi, I am the Customer Support Chat Bot. How can I assist you today?`,
  }]);

  const [newMessage, setNewMessage] = useState('');

  return (
    <Box 
      width="100vw"
      height="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Stack for messages */}
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={2}
      >
        <Stack
          direction="column"
          width="600px"
          height="700px"
          overflow="auto"
          border="1px solid black"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box 
              key={index}
              display="flex"
              justifyContent={
                message.role === 'Assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'Assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white" // color of the text
                borderRadius={2}
                p={5}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
