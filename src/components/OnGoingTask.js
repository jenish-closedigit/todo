import React, { useRef } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Form } from 'react-bootstrap'
import { CheckCircleIcon, XIcon, CheckIcon } from '@heroicons/react/outline'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import Countdown from 'react-countdown'

export const OnGoingTask = ({ name, deadline, taskId, removeTask, completeTask, editTask }) => {

    let updatedNameRef = useRef()
    let updatedDeadlineRef = useRef()

    return (
        <Accordion className='my-3 shadow border-0 rounded' defaultActiveKey="1" style={{ width: "335px" }}>
            <Accordion.Item className='border-0' eventKey="0">
                <Accordion.Header className="bg-white" >
                    <div className='d-flex justify-content-between align-items-center w-100' >
                    <div className='d-flex align-items-center my-1'>
                        <div className='me-3 bg-transparent border-0 h-100 p-0' onClick={() => completeTask(taskId)} ><CheckCircleIcon className='text-muted' style={{ height: "23px" }} /></div>
                        <div className='d-flex flex-column' >
                            <span style={{ maxWidth: "240px" }} >{name}</span>
                            <span style={{ fontSize: "12px" }} className='text-muted mt-1' ><Countdown date={deadline} ><span className='text-warning' ><ExclamationCircleIcon className='pe-2' style={{ height: "14px" }} />time is up</span></Countdown></span>
                        </div>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className='bg-transparent border-0 p-2 me-2 d-flex align-items-center' onClick={ () => removeTask(taskId)} ><XIcon className='text-danger' style={{ height: "20px", opacity: "0.75" }} /></div>
                    </div>
                    </div>
                </Accordion.Header>
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
                            <button type='submit' className='bg-transparent border-0'  ><CheckIcon className='text-primary' style={{ height: "26px" }} /></button>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
