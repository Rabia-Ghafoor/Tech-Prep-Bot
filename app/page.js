'use client';

import React, { useState } from 'react';
import { Box, Stack, TextField, Button } from '@mui/material';
import styles from './page.module.css';

export default function Home() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi, I am the Techprep Bot. How can I assist you today?' }
    ]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = { role: 'user', content: message };
        setMessages([...messages, newMessage]);
        setMessage('');
        setLoading(true);

        try {
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

            setMessages([...messages, newMessage, { role: 'assistant', content: assistantReply }]);

        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages([...messages, newMessage, { role: 'assistant', content: "Sorry, something went wrong. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            className={styles.main}
        >
            <Stack
                className={styles.chatContainer} /* Apply the new class */
                direction="column"
                width="600px"
                maxWidth="90%"
                height="70vh"
                maxHeight="calc(100vh - 250px)"
                border="2px solid white"
                borderRadius={2}
                padding={2}
                spacing={2}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        display="flex"
                        justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
                        width="100%"
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

            <Stack
                direction="row"
                spacing={1}
                marginTop={2}
                width="600px"
                maxWidth="90%"
                className={styles.center}
            >
                <TextField
                    label="Type your message here"
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
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    {loading ? "Sending..." : "Send"}
                </Button>
            </Stack>
        </Box>
    );
}
