import { useState } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Trash } from "lucide-react"


interface Props {
    children: React.ReactNode,
    type: "query" | "headers" | "body";
}

export function NodeOptionDialog({ children, type }: Props) {
    const [fields, setFields] = useState<number[]>([1])
    return (
        <Dialog>
            <form>
                <DialogTrigger className="border w-full" asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm max-h-screen overflow-y-auto overflow-x-hidden">
                    <DialogHeader>
                        {type === 'query' && <DialogTitle>Add Query Params</DialogTitle>}
                        {type === 'headers' && <DialogTitle>Add Headers</DialogTitle>}
                        {type === 'body' && <DialogTitle>Add Body </DialogTitle>}
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="gap-2">
                        {
                            fields.map(id =>{
                                return  (
                                    <div key={String(id)} className="flex items-center justify-between gap-4 ">
                                      <div className="flex flex-col gap-2 w-full" >
                                      <Field>
                                            <Label htmlFor="name-1" >Name</Label>
                                            <Input id="name-1" name="name" className="rounded-none h-6 px-2" />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="value">Value</Label>
                                            <Input id="username-1" name="value" className="rounded-none h-6 px-2" />
                                        </Field>
    
                                        <Separator className="my-2 "/>
                                      </div>
                                      <div className=" w-[15%]">
                                       {
                                        id>1 &&  <Button 
                                        onClick={()=>setFields(()=>fields.filter((x)=>x!=id))}
                                        variant={'ghost'} className="hover:bg-red-300 cursor-pointer"><Trash className="size-5"/></Button>
                                       }
                                      </div>
                                    </div>
                                )
                            })  
                        }


                    </FieldGroup>
                    <DialogFooter>
                        <Button
                         variant={"secondary"}
                         onClick={()=>{
                            setFields((prev) => {
                                return [...prev, (prev[prev.length-1]??0)+1]
                            })
                         }}
                        >
                            Add Fields
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}


const fields = [1]