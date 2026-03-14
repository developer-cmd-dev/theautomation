import React from 'react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import ExecutionResult from './ExecutionResult'

function SchedulerNodeConfig() {
  return (
         <div className="w-full h-full  flex items-center ">
            <div id="menu" className=" h-full  w-[40%] flex flex-col gap-5 p-6 ">
              <div className="input-area  flex flex-col gap-4 ">
                <Label className="text-gray-500 font-semibold">Trigger Interval</Label>
                <Select >
                  <SelectTrigger className="w-full max-w-full">
                    <SelectValue placeholder="Select Interval" />
                  </SelectTrigger>
                  <SelectContent  >
                    <SelectGroup>
                      <SelectItem value="ap ple">Minutes</SelectItem>
                      <SelectItem value="banana">Hours</SelectItem>
                      <SelectItem value="blueberry">Days</SelectItem>
                      <SelectItem value="grapes">Weeks</SelectItem>
                      <SelectItem value="pineapple">Months</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="input-area  flex flex-col gap-4 ">
                <Label className="text-gray-500 font-semibold">Days Between Triggers</Label>
                <Input defaultValue={1} type="number" max={31} min={1} />
              </div>

              <div className="input-area  flex flex-col gap-4 ">
                <Label className="text-gray-500 font-semibold">Trigger at hours</Label>
                <Select >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select Time" />
                  </SelectTrigger>
                  <SelectContent  >
                    <SelectGroup>
                      {
                        Array.from({ length: 24 }, (_, i) => i + 1).map((x) => {
                          if (x >= 13) {
                          return(
                            <SelectItem key={x} value={`${x-12}pm`}>
                            {`${x-12}pm`}
                          </SelectItem>
                          )
                          } else {
                            return (
                              <SelectItem key={x} value={`${x}Am`}>
                                {`${x}Am`}
                              </SelectItem>
                            )
                          }
                        })

                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="input-area  flex flex-col gap-4 ">
                <Label className="text-gray-500 font-semibold">Trigger at Minute</Label>
                <Input defaultValue={0} type="number" max={60} min={0} />
                
              </div>
            </div>

           <ExecutionResult type="Output"/>
          </div> 
  )
}

export default SchedulerNodeConfig