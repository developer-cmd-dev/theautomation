import React, { useRef, useState, type ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Editor, type Monaco } from '@monaco-editor/react'
import { Button } from './ui/button'



interface Props {
    children: ReactNode;
    saveBodyData:(data:string)=>void
}


function HttpNodeBodyEditor({ children,saveBodyData }: Props) {

    const editorRef = useRef<Monaco>(null)
    const [editorData,setEditorData]=useState('')
    

    
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className=' h-[80%] w-[90%] flex flex-col  '>
                <DialogHeader className=' h-fit'>
                    <DialogTitle>Add Body </DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className='h-full'>
                <Editor 
                    onChange={(e)=>setEditorData(e?.toString()??"")}
                    className='rounded-md border' 
                    language='json'
                    theme='vs-light'
                    onMount={(editor)=>editorRef.current=editor}
                    value={editorData}
                    />
                </div>
                <DialogClose asChild>
                    <Button type='button' onClick={()=>saveBodyData(editorRef.current.getValue())} variant={'default'} className='w-fit mx-auto'>
                        Save changes
                    </Button>
                </DialogClose>
            </DialogContent>


        



        </Dialog>
    )
}

export default HttpNodeBodyEditor