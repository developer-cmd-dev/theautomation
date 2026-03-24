import type { CreateWorkflowSchema } from "@repo/types/types";
import { create } from "zustand";



interface WorkflowType extends CreateWorkflowSchema{
    _id:string
}


 type StoreSchema = {
    data:WorkflowType|null;
    existingWorkFlows:WorkflowType[];
    setWorkFlowData:(data:WorkflowType)=>void;
    setExistingWorkFlows:(data:WorkflowType[])=>void;
}


const useWorkflowData = create<StoreSchema>((set)=>(
    {
      data:null,
      existingWorkFlows:[],
      setWorkFlowData(data) {    
        set(()=>({
            data:data
        }))
      },
      setExistingWorkFlows(data) {

        if(Array.isArray(data)){
          set(()=>(
            {
              existingWorkFlows:data
            }
          ))
        }else{

          set((state)=>(
            {
              existingWorkFlows:[...state.existingWorkFlows,data]
            }
          ))
        }

        
      },

    }
))


export {useWorkflowData}