import React from 'react'
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid'

export const CompletedTask = ({ name, taskId, removeTask }) => {
    return (
        <div style={{backgroundColor: "#fff"}} className='d-flex align-items-center justify-content-between gap-3 p-3 rounded-pill my-2 shadow' >
            <div className='d-flex' >
            <CheckCircleIcon className='me-3 text-success' style={{height: "24px"}} />
            <span className='text-decoration-line-through text-muted' style={{maxWidth: "240px"}} >{name}</span>
            </div>
            <div className='d-flex gap-2' >
                <button className='bg-transparent border-0 p-0 d-flex align-items-center' onClick={() => removeTask(taskId)} ><XIcon className='text-danger' style={{height: "20px", opacity: "0.75"}} /></button>
            </div>
        </div>
    )
}
