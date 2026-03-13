import {create} from 'zustand'




type NodeMenuDrawerData ={
    isCreated:boolean;
    nodeType:string|null;
}

interface NodeMenuDrawer{
    data:NodeMenuDrawerData

    setNodeDrawerHandleData:(data:NodeMenuDrawerData)=>void;
}



const useNodeMenuDrawerData = create<NodeMenuDrawer>((set)=>(
    {
        data:{
            isCreated:false,
            nodeType:null
        },
        setNodeDrawerHandleData:(data:NodeMenuDrawerData)=>{
         set(()=>({data:{isCreated:data.isCreated,nodeType:data.nodeType}}))
        }
    }
))


export default useNodeMenuDrawerData;