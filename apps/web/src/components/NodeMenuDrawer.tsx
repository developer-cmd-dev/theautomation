import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"
import { Braces, Clock, Globe, X, Zap } from "lucide-react"

import useNodeMenuDrawerData from "@/store/nodeMenuDrawer.store"
import HttpNodeConfig from "./HttpNodeConfig"
import SchedulerNodeConfig from "./SchedulerNodeConfig"
import GeminiNodeConfig from "./GeminiNodeConfig"
import ScriptNodeConfig from "./ScriptNodeConfig"

export function NodeMenuDrawer() {
  const { data } = useNodeMenuDrawerData((state) => state)
  const [open, setOpen] = useState(data.isCreated)


  useEffect(() => {
    setOpen(data.isCreated)
  }, [data])


  return (
    <Drawer open={open} onOpenChange={setOpen}  >

      <DrawerContent className="h-250" >
        <div className="mx-auto w-full h-full ">
          <DrawerHeader className=" flex flex-row  items-center  h-15   justify-between  ">
            {
              data.nodeType === 'scheduler' && <DrawerTitle className="flex items-center gap-2 text-xl "><Clock className="size-7" />Schedule Trigger</DrawerTitle>
            }
            {
              data.nodeType === 'http-request' && <DrawerTitle className="flex items-center gap-2 text-xl "><Globe className="size-7" />HTTP Node</DrawerTitle>
            }

            {
              data.nodeType === 'gemini-model' && <DrawerTitle className="flex items-center gap-2 text-xl "><Globe className="size-7" />Gemini Node</DrawerTitle>
            }

{
              data.nodeType === 'code' && <DrawerTitle className="flex items-center gap-2 text-xl "><Braces className="size-7" />Script Node</DrawerTitle>
            }

            <DrawerDescription></DrawerDescription>
            <Button onClick={() => setOpen(false)} className="border rounded-2xl">
              <X />
            </Button>
          </DrawerHeader>


          {data.nodeType === 'scheduler' && <SchedulerNodeConfig />}
          {data.nodeType === 'http-request' && <HttpNodeConfig />}
          {data.nodeType === 'gemini-model' && <GeminiNodeConfig />}
          {data.nodeType === 'code' && <ScriptNodeConfig />}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
