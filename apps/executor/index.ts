import { WorkflowModel } from "@repo/db/schema";

const cache:object|null=null;



async function main(){
console.log("main fun run")
try {
    
// if(!cache){
    
// }


const getWorkflow =await WorkflowModel.findById({_id:"69c8e162f42dee06417ac4e2"})
    console.log(getWorkflow)

} catch (error) {
    console.log(error)
}




}



main()


