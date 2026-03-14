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
}

export function GeminiCredentialDialog({ children }: Props) {
    const [fields, setFields] = useState<number[]>([1])
    return (
        <Dialog >
            <form>
                <DialogTrigger className="border w-full" asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="h-96 w-5xl overflow-y-auto overflow-x-hidden">
                    <DialogHeader>
                        <DialogTitle>Model Credential</DialogTitle>

                        <DialogDescription>
                            Please enter the credential information needed to connect to the Gemini Model API. This typically includes an API key or service account credentials. You can give your credential a custom name for easier identification later.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="gap-4">
                        <Field>
                            <Label htmlFor="host" >Host</Label>
                            <Input id="host" name="host"  defaultValue={'https://generativelanguage.googleapis.com'}/>
                        </Field>

                        <Field>
                            <Label htmlFor="host" >API Key</Label>
                            <Input id="host" name="host" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                      
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