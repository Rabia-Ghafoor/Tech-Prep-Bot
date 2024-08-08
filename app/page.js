'use client'

import { Box, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import Image from 'next/image';


export default function Home() {

  const [messages, setMessages] = useState([{
    role: 'Assistant',
    content: `Hi, I am the Customer Support Chat Bot. How can I assist you today?`,
  }]);

  const [message, setMessage] = useState('');

  // helper function
  const sendMessage = async () => {
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = await fetch('api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = '';
    reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }

      const text = decoder.decode(value || new Int8Array(), { stream: true });
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);

        return ([
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]);
      });

      return reader.read().then(processText);
    });
  };

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

        <Stack direction="row" spacing={2}>
          <TextField 
            label="message" 
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}> 
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
