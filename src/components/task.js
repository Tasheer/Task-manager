import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {
    return (
        // the below code is right but we need to add some style conditions that's why we will be using an expression
        // <div className='task' onDoubleClick={() => onToggle(task.id)}>

        // here task is still a class but the condition is if 
        // task.reminder is true then a new class will be available by name of reminder on which we have some styling 
        // to target reminder in css we will be doing .task.reminder
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text} 
                <FaTimes 
                    style={{
                        color:'red', 
                        cursor:'pointer'
                    }} 
                    // we drilled the onDelete till here
                    // first passed in as a prop in app.js then destructured and passed in as a prop again then again destructured and finally used
                    // we have to pass in id that's why we did this
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;