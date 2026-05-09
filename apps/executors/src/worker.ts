import { httpNode, openRouterExecutor } from "@repo/executors/index.ts";
import { NodeSchema } from "@repo/types/types";
import { Worker } from "bullmq";


async function workerJob() {
    const worker = new Worker("n8n",
        async (job)=>{
           if(!job.data) return;

           const nodes = <NodeSchema[]> job.data.nodes;
            if(!nodes||nodes.length==0)return;

            for(const data of nodes){
                if(data.nodeType==='openRouter'){
                    openRouterExecutor()
                }else if(data.nodeType==='http-request'){
                    httpNode()
                }
            }
        },
        {
            connection:{
                host:"localhost",
                port:6379
            },
            concurrency:5
        },
        
        
    )


    worker.on("ready", () => {
        console.log("Worker Ready");
     });

    worker.on("completed", (job) => {
        console.log("Job Completed:", job.data);
    });

    worker.on("failed", (job, err) => {
        console.log("Job Failed:", err);
    });
    
    
}

export default workerJob