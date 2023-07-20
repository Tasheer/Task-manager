import React,{useState} from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()
        // we can't do this
        // if(text === '' || day === '') {
        if(!text || !day) {
            alert('Fill all the details')
            return
        } else{
            onAdd({ text, day, reminder })
            
            // this is to empty the fields once the submission is done
            setText('')
            setDay('')
            setReminder(false)
        }
    }
    return (
        // we are not calling onAdd directly here coz we need to add some conditions before submitting 
        // so we will call onAdd in onSubmit function and then call onSubmit here
        <form className='add-form' onSubmit={onSubmit}>
            
            <div className="form-control">
                <label>
                    Task
                </label>
                <input 
                    type="text" 
                    placeholder='Add Task'
                    // here we entered the value to be the value entered in the state
                    value={text}
                    // we will be updating the state using setText using  onChange event
                    onChange={((e) => setText(e.target.value))}
                />
            </div>

            <div className="form-control">
                <label>
                    Date and Time
                </label>
                <input 
                    type="text" 
                    placeholder='Date and Time'
                    value={day}
                    onChange={((e) => setDay(e.target.value))}
                />
            </div>

            <div className="form-control-check">
                <label>
                    Set reminder
                </label>
                <input 
                    type="checkbox" 
                    checked={reminder}
                    value={reminder}
                    // to get the value of checkbox we use this
                    onChange={((e) => setReminder(e.currentTarget.checked))}
                />
            </div>

                <input 
                    type="submit" 
                    value={'Save task'} 
                    className='btn btn-block'
                />

        </form>
    )
}

export default AddTask