'use client';

import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';

export default function Home() {
    // State to hold the list of messages
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi, I am the Customer Support Chat Bot. How can I assist you today?' }
    ]);

    // State to hold the current message being typed
    const [message, setMessage] = useState('');

    // State to manage loading state when sending a message
    const [loading, setLoading] = useState(false);

    // Function to handle sending a message
    const sendMessage = async () => {
        if (!message.trim()) return; // Don't send empty messages

        const newMessage = { role: 'user', content: message };
        setMessages([...messages, newMessage]); // Add the new message to the messages array
        setMessage(''); // Clear the input field
        setLoading(true); // Set loading state

        try {
            // Send the message to the API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, newMessage]),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Response error:', response);
                console.error('Response body:', errorBody);
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            const assistantReply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

            setMessages([...messages, newMessage, { role: 'assistant', content: assistantReply }]); // Update messages with assistant's reply

        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages([...messages, newMessage, { role: 'assistant', content: "Sorry, something went wrong. Please try again later." }]);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding={2}
        >
            <Typography variant="h4" gutterBottom>
                Customer Support Chat
            </Typography>

            <Stack
                direction="column"
                width="600px"
                height="70vh"
                border="1px solid black"
                borderRadius={2}
                padding={2}
                spacing={2}
                overflow="auto"
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        display="flex"
                        justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
                    >
                        <Box
                            bgcolor={msg.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                            color="white"
                            borderRadius={2}
                            padding={2}
                            maxWidth="80%"
                        >
                            {msg.content}
                        </Box>
                    </Box>
                ))}
            </Stack>

            <Stack direction="row" spacing={2} marginTop={2}>
                <TextField
                    label="Type your message"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
                    disabled={loading}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </Button>
            </Stack>
        </Box>
    );
}
