import { OpenRouter } from "@openrouter/sdk";




export async function openRouterExecutor(apiKey:string,modelName:string,data:any) {
    if(!apiKey||!modelName){
        throw new Error("Invalid Input")
    }

  try {
    const openrouter = new OpenRouter({
      apiKey: apiKey
    });
    
    // Stream the response to get reasoning tokens in usage
    const stream = await openrouter.chat.send({
      chatRequest: {
        model: modelName,
        messages: [
          {
            role: "user",
            content: "How many r's are in the word 'strawberry'?"
          }
        ],
        stream: true
      }
 
    });
    
    let response = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        response += content;
        process.stdout.write(content);
      }
    
      // Usage information comes in the final chunk
      if (chunk.usage) {
        console.log("\nReasoning tokens:", chunk.usage);
      }
    }
  } catch (error) {
    console.log(error)
  }
}