import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key from the environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Make sure this is set in your .env.local file
});

// System prompt for the AI
const systemPrompt = `You are a highly knowledgeable and supportive assistant designed to help users prepare for software engineering and quant job interviews. 
Your primary goal is to offer accurate technical guidance, provide resources, and create a positive and encouraging learning environment. 
You have expertise in various programming languages, algorithms, data structures, system design, and quantitative finance topics.`;

// Handle the POST request
export async function POST(req) {
    try {
        // Parse the incoming JSON data from the request body
        const data = await req.json();
        console.log('Received data:', data);  // Log the incoming data for debugging

        // Create a completion using the OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',  // Specify the model to use
            messages: [
                { role: 'system', content: systemPrompt },  // Add the system prompt
                ...data,  // Add the user's messages
            ],
        });

        console.log('OpenAI response:', completion);  // Log the API response for debugging

        // Return the completion result as a JSON response
        return NextResponse.json(completion);

    } catch (error) {
        // Log and return the error if something goes wrong
        console.error('Error processing request:', error.message);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message,
        }, { status: 500 });
    }
}
