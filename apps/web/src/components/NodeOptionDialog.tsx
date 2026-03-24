import React, { useEffect, useState, type ChangeEvent } from "react"
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
    const [fields, setFields] = useState<Record<string, string>[]>([{}])
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'key') setKey(e.target.value)
        else setValue(e.target.value)
    }



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
                            fields.map((obj) => {
                                return (
                                    <div key={fields.indexOf(obj)} className="flex items-center justify-between gap-4 ">
                                        <div className="flex flex-col gap-2 w-full" >
                                            <Field>
                                                <Label htmlFor="key" >Key</Label>
                                                <Input
                                                    value={key}
                                                    id={`key-${fields.length}`}
                                                    name="key"
                                                    className="rounded-none h-6 px-2"
                                                    onChange={onFieldChange}
                                                />
                                            </Field>
                                            <Field>
                                                <Label htmlFor="value">Value</Label>
                                                <Input
                                                    value={value}
                                                    id={`value-${fields.length}`}
                                                    name="value"
                                                    className="rounded-none h-6 px-2"
                                                    onChange={onFieldChange}
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
                                    return [...prev, {}]
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

