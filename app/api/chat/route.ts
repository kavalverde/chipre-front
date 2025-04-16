import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    system: `Eres un asistente especializado en información sobre Chipre. 
    Proporciona datos interesantes, históricos, culturales y turísticos sobre la isla.
    Responde en español de manera concisa y amigable.`,
    messages,
  })

  return result.toDataStreamResponse()
}
