import { Worker } from "bullmq";


async function workerJob() {
    const worker = new Worker("n8n",
        async (job)=>{
            console.log(job.data)
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