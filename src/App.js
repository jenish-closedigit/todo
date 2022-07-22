import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { CompletedTask } from './components/CompletedTask';
import { Task } from './components/Task';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircleIcon } from '@heroicons/react/outline'
import { OnGoingTask } from './components/OnGoingTask';

function App() {

  // Tasks data
  const [pendingTasks, setPendingTasks] = useState([])
  const [onGoingTasks, setOnGoingTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  let taskNameRef = useRef()
  let deadlineRef = useRef()

  // Delete element functions
  function removePendingTask(taskId) {
    let newPendingTasks = pendingTasks.filter((task) => {
      return task.key !== taskId
    })
    setPendingTasks(newPendingTasks)
  }

  function removeOnGoingTask(taskId) {
    let newOnGoingTasks = onGoingTasks.filter((task) => {
      return task.key !== taskId
    })
    setOnGoingTasks(newOnGoingTasks)
  }

  function removeCompletedTask(taskId) {
    let newCompletedTasks = completedTasks.filter((task) => {
      return task.key !== taskId
    })
    setCompletedTasks(newCompletedTasks)
  }

  // Add and complete functions
  function handleAddTask(taskName, deadline) {
    let formatedDateAndTime = deadline.replace(/T/, " ")
    setPendingTasks([
      ...pendingTasks,
      {
        key: uuidv4(),
        name: taskName,
        deadline: formatedDateAndTime
      }
    ])
    taskNameRef.current.value = "";
  }

  function handleCompleteTask(taskId) {
    setCompletedTasks([
      ...completedTasks, onGoingTasks.find((task) => { return task.key === taskId })
    ])
    removeOnGoingTask(taskId)
  }

  function handleStartTask(taskId){
    setOnGoingTasks([
      ...onGoingTasks, pendingTasks.find((task) => {return task.key === taskId})
    ])
    removePendingTask(taskId)
  }

  function handleEditPendingTask(taskId, name, deadline) {
    setPendingTasks(pendingTasks.map((task) => {
      if(task.key === taskId){
        return {...task, name: name, deadline: deadline.replace(/T/, " ")}
      }else{
        return task
      }
    }))
  }

  function handleEditOnGoingTask(taskId, name, deadline) {
    setOnGoingTasks(onGoingTasks.map((task) => {
      if(task.key === taskId){
        return {...task, name: name, deadline: deadline.replace(/T/, " ")}
      }else{
        return task
      }
    }))
  }


  return (
    <div style={{ backgroundColor: "#f5fbfe", minHeight: "100vh" }} className='d-flex justify-content-center font-poppins' >
      <div className="d-flex flex-column">

        <div className="form mt-5 ">
          <span className='fw-bolder fs-4 text-center d-block mb-4' >Todo List</span>
          <Form style={{width: "335px"}} className='d-flex bg-white shadow rounded p-2 px-3 justify-content-between' onSubmit={(e) => { e.preventDefault(); handleAddTask(taskNameRef.current.value, deadlineRef.current.value) }} >
            <Form.Group>
              <input required style={{ outline: "none", width: "210px" }} className='bg-transparent border border-top-0 border-start-0 border-end-0 border-muted p-2' type="text" placeholder='Enter to do here . . .' ref={taskNameRef} />
              <div className='d-flex flex-column my-3' >
                <span style={{fontSize: "14px"}} className='text-muted mt-1' >Deadline</span>
                <input style={{maxWidth: "210px", outline: "none"}} type="datetime-local" className='border-0 deadline mt-1' ref={deadlineRef} />
              </div>
            </Form.Group>
            <div style={{ opacity: "0.75" }} className='d-flex align-items-center'>
              <button type='submit' className='bg-transparent border-0 me-3'  ><PlusCircleIcon className='text-primary' style={{ height: "26px" }} /></button>
            </div>
          </Form>
        </div>

        <div style={{ maxWidth: "400px" }} className='mt-5' >
          <span style={{ fontWeight: "500" }} className='fs-5 d-block mb-3' >All Tasks</span>
          {pendingTasks.length ? pendingTasks.map((task) => {
            return <Task key={task.key} name={task.name} deadline={task.deadline} taskId={task.key} removeTask={removePendingTask} startTask={handleStartTask} editTask={handleEditPendingTask} />
          }) : ""}
        </div>

        <div style={{ maxWidth: "400px" }} >
          {onGoingTasks.length ? onGoingTasks.map((task) => {
            return <OnGoingTask key={task.key} name={task.name} deadline={task.deadline} taskId={task.key} removeTask={removeOnGoingTask} completeTask={handleCompleteTask} editTask={handleEditOnGoingTask} />
          }) : ""}
        </div>

        <div style={{ maxWidth: "400px" }} className='' >
          {completedTasks.length ? completedTasks.map((task) => {
            return <CompletedTask key={task.key} name={task.name} taskId={task.key} removeTask={removeCompletedTask} />
          }) : ""}
        </div>
        
        {!pendingTasks.length && !completedTasks.length && !onGoingTasks.length ? <p className='my-2 text-muted'>No completed tasks</p> : ""}
      </div>
    </div>
  );
}

export default App;
