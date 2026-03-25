import React, { useEffect, useRef, useState, type ChangeEvent } from "react"
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
import { Target, Trash } from "lucide-react"
import type { HttpFields } from "@/types/types"



interface Props {
    children: React.ReactNode,
    type: "query" | "headers" | "body";
    submitFields:(fields:HttpFields[])=>void
}

export function NodeOptionDialog({ children, type ,submitFields}: Props) {
    const [fields, setFields] = useState<HttpFields[]>([{
        type:type,
        key: "",
        value: ""
    }])



    const formRef = useRef<HTMLFormElement>(null)

    const fieldOnChange = (e:ChangeEvent<HTMLInputElement>,index:number)=>{
        if(e.target && e.target.name==='key'){

            setFields((prev)=>{

                let value:HttpFields = prev[index] as HttpFields;

                prev[index]={
                    ...value,
                    key:e.target.value
                }

                return prev
            })


        }else if(e.target && e.target.name ==='value'){
            setFields((prev)=>{
                let value:HttpFields = prev[index] as HttpFields;

                prev[index]={
                    ...value,
                    value:e.target.value
                }
                return prev
            })
        }



    }



    return (
        <Dialog >
            <form ref={formRef} onSubmit={(e)=>{
                e.preventDefault()
                submitFields(fields)
            }} >
                <DialogTrigger className="border w-full" asChild>
                    {children}
                </DialogTrigger>
                <DialogContent  className="sm:max-w-sm max-h-screen overflow-y-auto overflow-x-hidden">
                    <DialogHeader>
                        {type === 'query' && <DialogTitle>Add Query Params</DialogTitle>}
                        {type === 'headers' && <DialogTitle>Add Headers</DialogTitle>}
                        {type === 'body' && <DialogTitle>Add Body </DialogTitle>}
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="gap-2">
                        {
                            fields.map((obj, index) => {
                                return (
                                    <div key={fields.indexOf(obj)} className="flex items-center justify-between gap-4 ">
                                        <div className="flex flex-col gap-2 w-full" >
                                            <Field>
                                                <Label htmlFor="key" >Key</Label>
                                                <Input
                                                
                                                    onChange={(e) =>fieldOnChange(e,index)}
                                                    id={`key-${fields.length}`}
                                                    name="key"
                                                    className="rounded-none h-6 px-2"
                                                />
                                            </Field>
                                            <Field>
                                                <Label htmlFor="value">Value</Label>
                                                <Input
                                                 
                                                    onChange={(e) => fieldOnChange(e,index)}
                                                    id={`value-${fields.length}`}
                                                    name="value"
                                                    className="rounded-none h-6 px-2"
                                                />
                                            </Field>

                                            <Separator className="my-2 " />
                                        </div>
                                        <div className=" w-[15%]">
                                            {
                                                fields.indexOf(obj) > 0 && <Button
                                                    onClick={() => setFields((prev) => prev.filter((_, index) => index != prev.indexOf(obj)))}
                                                    variant={'ghost'} className="hover:bg-red-300 cursor-pointer"><Trash className="size-5" /></Button>
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
                            onClick={() => {

                                setFields((prev) => {
                                    return [...prev, {type, key: '', value: '' }]
                                })
                            }}
                        >
                            Add Fields
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                        <Button type="button" onClick={()=>submitFields(fields)} >Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

