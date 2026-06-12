import mongoose from "mongoose";
import "dotenv/config";
import { UserModel, WorkflowModel } from "@repo/db/client";
import { NodeSchema, WorkflowSchema } from "@repo/types/types";
import { Queue } from 'bullmq'
import workerJob from "./src/worker.js";
const dbUrl = process.env.MONGODB_URL ?? "";

console.log(dbUrl)

const queue = new Queue('n8n', {
  connection: {
    host: "localhost",
    port: 6379
  }
})

async function main() {
  await dbConnection()
  workerJob()


  try {
    const allWorkflow = await WorkflowModel.find({ isActive: true })
    for (const data of allWorkflow) {
      const FUTURE_TIME = data.nodes[0].nodeConfig.executeInMinute;
      await queue.add(
        "execute-workflow",
        {
          nodes: data.nodes
        },
        {
          repeat: {
            every: 1 * 60 * 1000
          }
        }
      )
    }




  } catch (error) {
    console.log(error)
  }



}



main()


async function dbConnection() {
  mongoose.connect("mongodb://localhost:27017/").then(state => {
    if (state.connection.readyState === 1) {

      console.log("Mongodb connected");

    }

  }).catch(error => {
    console.log(error)
  })
}