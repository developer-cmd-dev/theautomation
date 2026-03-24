import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Braces, Brain, Clock, Globe, IterationCcw, Watch } from "lucide-react"

interface Props {
  children: React.ReactNode,
  type: 'trigger' | 'node',
  handleClick:(nogeType:string)=>void;
}

export function SheetTriggerComponent({ children, type ,handleClick}: Props) {

  return (
    <Sheet >
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{type === 'trigger' ? 'Trigger Workflow' : `What Happens next ?`}</SheetTitle>
          <SheetDescription>
            {type === 'trigger' ? 'A trigger is a step that starts your workflow'
              : "Create Node to perform task after trigger."}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Input id="search-trigger" type="text" placeholder={type === 'trigger' ? "search-trigger" : "search-nodes"} />
          </div>

          <Separator />

          {
            type === 'trigger' ? (
              <div onClick={()=>{
                handleClick(type)
              }} className=" gap-5 flex  h-fit items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <div>
                  <Clock className="size-6 text-gray-500" />
                </div>

                <div>
                  <h1 className="font-bold text-gray-500">On a Schedule</h1>
                  <p className="font-light text-gray-400">Runs the flow every day,hour,or custom interval</p>
                </div>

              </div>
            ) : (
              nodesList.map((element) => {
                
                return (
                  <div
                  onClick={()=>{
                    handleClick(element.type)
                  }}
                  key={element.title} className=" gap-5 flex  h-fit items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                    <div>
                      {element.icon}
                    </div>
  
                    <div>
                      <h1 className="font-bold text-gray-500">{element.title}</h1>
                      <p className="font-light text-gray-400">{element.description}</p>
                    </div>
  
                  </div>
                )
              })
            )
          }
        </div>


      </SheetContent>
    </Sheet>
  )
}


const nodesList = [
  {
    type: 'gemini-model',
    name: 'gemini',
    icon:<Brain className="size-6" />,
    title: 'Gemini',
    description: ''
  },
  {
    type: 'http-request',
    name: "Http",
    icon: <Globe className="size-6" />,
    title: "HTTP Request",
    description: 'Makes and HTTP request and returns the response data.'
  },
  {
    type: 'code',
    name: "Code",
    icon: <Braces className="size-6" />,
    title: "Code",
    description: 'Run custom Javascript Code.'
  },
  {
    type: 'google-docs',
    name: "Google Docs",
    icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
      <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path><path fill="#bbdefb" d="M40 13L30 13 30 3z"></path><path fill="#1565c0" d="M30 13L40 23 40 13z"></path><path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
    </svg>,
    title: "Google Docs",
    description: ''
  }
]