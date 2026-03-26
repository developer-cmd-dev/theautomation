import { test, expect } from "bun:test"

const backendUrl = "http://localhost:8080/api/v1"



test.skip("create workflow", async () => {

    const data = {
        name: "My workflow",
        connections: [],
        nodes: {},
    }

    const response = await fetch(`${backendUrl}/create-workflow`, {
        method: 'POST', // *Method* is specified
        headers: {
            'Content-Type': 'application/json' // Inform the server the body is JSON
        },
        body: JSON.stringify(data)
    })

    expect(response.status).toBe(200)

})



test("create gemini credential", async () => {

    const data = {
        name: "Google Gemini api",
        type: "gemini api",
        data: { apiKey: "dkfjlsdjfldkfjlkdjf" },
        workflowId: "69c4389f4733d649dc848b3f"
    }


    const response = await fetch(`${backendUrl}/credential`, {
        method: 'POST', // *Method* is specified
        headers: {
            'Content-Type': 'application/json' // Inform the server the body is JSON
        },
        body: JSON.stringify(data)
    })

    console.log(await response.json())

    expect(response.status).toBe(200)
})


test("delete gemini credential",async()=>{

    const response = await fetch(`${backendUrl}/credential/?id=${"69c43a06ac29e89e8bc301d9"}`,{
        method:"DELETE",
        headers:{
            'Content-Type':"application/json"
        },
        
    })
    console.log(await response.json())

    expect(response.status).toBe(200)



})