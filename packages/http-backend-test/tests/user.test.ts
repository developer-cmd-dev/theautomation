import {test,expect} from 'bun:test'



test.only("create user",async function(){
    const backendUrl = "http://localhost:8080/api/v1/signup"
    const userPayload = {
        name:"dev",
        email:"devkmandal0@gmail.com",
        password:'Devk4522@@'
    }

   const response = await fetch(backendUrl,{
        method:"POST",
        body:JSON.stringify(userPayload)
    })

    expect(response.status).toBe(200);
    console.log(await response.json());

})