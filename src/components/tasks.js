import React from 'react'
import Task from './task'

// destructuring the tasks
const Tasks = ({ tasks, onDelete, onToggle }) => {
    // we stored tasks in a state so that we can change it using setTasks
    // state cannot be directly changed

    return (
        <>
        {
        tasks.map((task, index) => (
            // syntax is a little different from vanilla js
            // we need to assign a unique prop to the parent html element
            //the below code is when we didn't had a Task component
            // <h3 key={task.id} >{task.text}</h3>

            <Task 
                key={index} 
                task={task} 
                onDelete={onDelete} 
                onToggle={onToggle} />
            //      ^
            // here we are passing each task as a prop
        ))
        }
        </>
        
    )
}

export default Tasks 