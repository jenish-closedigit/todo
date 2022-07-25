import React, { useRef, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { PlayIcon, XIcon, CheckIcon } from '@heroicons/react/outline'
import { Form } from 'react-bootstrap'
import Animate from 'react-smooth/lib/Animate';

export const Task = ({ name, deadline, taskId, removeTask, startTask, editTask }) => {

    let updatedNameRef = useRef()
    let updatedDeadlineRef = useRef()

    const [ animation, setAnimation ] = useState("enter")

    return (
        <Animate className="transition" to={animation === "enter" ? "1" : "0"} from={animation === "enter" ? "0" : "1"} attributeName="opacity">
        <Accordion className='my-3 shadow border-0 rounded' defaultActiveKey="1" style={{ width: "335px" }}>
            <Accordion.Item className='border-0 position-relative' eventKey="0">
                <Accordion.Header className="d-flex align-items-center justify-content-between bg-white" >
                    <div className='d-flex align-items-center justify-content-between w-100' >
                        <div className='d-flex align-items-center gap-1 my-1' >
                            <div className='bg-transparent border-0 h-100 p-2' onClick={() => startTask(taskId)} ><PlayIcon className='text-primary' style={{ height: "23px", width: "23px" }} /></div>
                            <div className='d-flex flex-column ms-2' >
                                <span className='fs-6 text-start' style={{ maxWidth: "240px" }} >{name}</span>
                                <span style={{ fontSize: "12px" }} className='text-muted mt-1 text-start'>{deadline}</span>
                            </div>
                        </div>
                        <div className='d-flex align-items-center' >
                        </div>
                    </div>
                </Accordion.Header>
                        <div style={{zIndex: "10", top: "22px", right: "40px", cursor: "pointer"}} className='bg-transparent position-absolute border-0 p-2 me-2 d-flex align-items-center' onClick={() => {setAnimation("remove"); setTimeout(() => {removeTask(taskId); setAnimation("enter")}, 1000)}} ><XIcon className='text-danger' style={{ height: "20px", opacity: "0.75" }} /></div>
                <Accordion.Body className='p-0 shadow' >
                    <Form className='d-flex gap-3 bg-white shadow rounded p-2 px-3' onSubmit={(e) => {e.preventDefault(); editTask(taskId, updatedNameRef.current.value, updatedDeadlineRef.current.value)}} >
                        <Form.Group>
                            <input required style={{ outline: "none" }} defaultValue={name} ref={updatedNameRef} className='bg-transparent border border-top-0 border-start-0 border-end-0 border-muted p-2' type="text" placeholder='Enter to do here . . .' />
                            <div className='d-flex flex-column my-3' >
                                <span style={{ fontSize: "14px" }} className='text-muted mt-1' >Deadline</span>
                                <input style={{ maxWidth: "210px", outline: "none" }} ref={updatedDeadlineRef} defaultValue={deadline} type="datetime-local" className='border-0 deadline mt-1' />
                            </div>
                        </Form.Group>
                        <div style={{ opacity: "0.75" }} className='d-flex align-items-center'>
                            <button type='submit' className='bg-transparent border-0' ><CheckIcon className='text-primary' style={{ height: "26px" }} /></button>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </Animate>
    )
}
