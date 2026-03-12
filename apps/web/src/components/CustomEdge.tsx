import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSimpleBezierPath, getStraightPath, MarkerType, Position, ReactFlow, useReactFlow, type Edge, type EdgeProps } from '@xyflow/react';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';


type CustomEdgeProps = {
  id:string,
  sourceX:number,
  sourceY:number,
  targetX:number,
  targetY:number,
  sourcePosition:number,
  targetPosition:number
  
}

type CustomEdgeType = Edge<CustomEdgeProps, 'custom'>



export function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps<CustomEdgeType>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,

  });

const{deleteElements  }=  useReactFlow()

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={"ArrowClosed"} />
      <EdgeLabelRenderer>
        <button
        onClick={()=>{
          deleteElements({edges:[{id}]})
        }}
        
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          pointerEvents: 'all',
        }}  className='h-fit w-fit bg-white p-0.5 rounded-xs border'>
          <Trash2 className='size-1.5' />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}