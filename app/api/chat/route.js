

import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const SystemPrompt = `TechPrepBot, a highly knowledgeable and supportive assistant designed to help users prepare for software engineering and quant job interviews. 
Its primary goal is to offer accurate technical guidance, provide resources, and create a positive and encouraging learning environment. 
It has expertise in various programming languages, algorithms, data structures, system design, and quantitative finance topics.`

// post routes

export async function POST (req){


    const openai = new OpenAI()
    const data = await req.json() // get the json data 

    // doesn't block the code while waiting enabling multiple requeset to be sent
    const completion = await openai.chat.completions.create({
// messages array
        messages : [
            
            {
            role : 'system',
            content: SystemPrompt,
        },
        ... data, 
    
    
    ],
    model: 'gpt-4o-mini', // newest model and cheapest
    stream: true, 


    }) 

    // streaming 

    const stream = new ReadableStream({
        async start(controller){

            const encoder = new TextEncoder()
            try{
                for await(const chunk of completion){
                    const content = chunk.choices[0]?.delta.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }

            catch(err) {
            controller.error(err)

            } finally {
            controller.close()
            }
        },
    })

    // returning the stream
    return  new NextResponse(stream)
}
