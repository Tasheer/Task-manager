import React, { useState, useEffect } from 'react';
// useeffect is used when you want something to occur right when the page loads
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/header";
import Tasks from "./components/tasks";
import AddTask from './components/add-task';
import Footer from './footer';
import About from './components/about';

function App() {
  // we added this here coz we might wanna use this data in other components so making it a global scope is a much better option
  const [showAddTask, setShowAddTask] = useState(false);
  // it's an empty array coz we are using json server here and don't want the hard coded data
  const [tasks, setTasks] = useState([])

  // here we have an async function gettasks which returns a promise that is equal to the fetchtasks(through which we are getting the data from server) then the promise is set equal to settasks which is an empty array that's being displayed in the webpage
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])
  
  // in [] we pass in a dependency array
  // when you want the useEffect to run when some value changes just add that as a dependency array
  // for eg you want to useEffect to run when value of user changes then we just pass in user as a dependency array
  

  // Fetch data from json server
  // json server acts just like any other server there is no difference 
  // normal fetching of data
  // this is to get all the tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    return data
  }

  // this is to get only one task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();
    return data
  }

// toggle add task

  const toggleAddTask = (() => {
    return setShowAddTask(!showAddTask)
  })


  // Add task to task list

  const addTask = (async (task) => {
    // fetching the data
    const res = await fetch('http://localhost:5000/tasks', {
      // adding the method
      method: 'POST',
      // to specify our content type we need to add header
      headers: {
        'content-type': 'application/json',
      },
      // this is the data we are sending
      // it will convert the javascript object to json string
      // we are sending task so added that as we want to convert that to json string
      body: JSON.stringify(task)
    })
    const data = await res.json()

    // this data is the new task which is added 
    // we will add this data to settask using spread

    setTasks([...tasks, data])

  })

  // delete task

  // making it an async function
  const deleteTask = async (id) => {

    // fetching data also using backtiks as we want id along side it
    await fetch(`http://localhost:5000/tasks/${id}`,{
      // here we are passing second argument which will specify the method
      // get, put, post, patch, delete these are the five http request we can make
      // GET is used to get something from the server
      // DELETE is used to delete something from the server
      // POST is used to add something to the server
      // PUT is used to update/modify something to the server but it will update the whole resource
      // PATCH is used to update as well but it only updates the required data not the whole resource in the server
      method:'DELETE'
    })

    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }
  
  // toggle reminder
  const toggleReminder = async (id) => {
    // here we are getting a single task with the speified id using fetchTask
    const taskToToggle = await fetchTask(id)
    // updating the single task using spread operator
    const updTask = {...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      // used  put as we are updating the data
      method:'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()


    setTasks(
      tasks.map((task) => {
        // used spread to change the data
        // return task.id === id ? {...task, reminder: !task.reminder} : task
        // instead of the above code we used data.reminder as "data" already has the required condition 
        return task.id === id ? {...task, reminder: data.reminder} : task
      })
    )
  }



  return (

    // to use route we need to wrap everything inside the router
    <Router>
    
     {/* we can only return one parent element in this that is div and all the other elements must come inside it any element out of it will give error */}
    <div className="container">

      <Header 
        onAdd={toggleAddTask} 
        showAddBtn={showAddTask} 
      />  




      {/* as written here and in  add-task file 
      onAdd{addTask} and onAdd({ text, day, reminder}) 
      with this we can say the addTask here is equivalent to the object we created
      and that's why when we log addTask function we will get the entries filled */}




      

      {/* { showAddTask && <AddTask onAdd={addTask} /> } */}





      {/* instead of ternary we use && so that we don't have to put an else condition  */}
      {/* we read it like if showAddTask is true then do this */}
      {/* the addtask window will only pop up when the showAddTask is true  */}




      {/* passing the tasks state as a prop */}
      {/* {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No tasks available'} */}







{/* if exact is not used then we will be send to homepage as while searching it will match the first thing only that will be / */}
{/* here the tasks are also being shown in the about section and we want to show them only in the homepage so we are doing this */}

      <Routes>
        <Route 
          path='/' 
          element={
          <>
            { showAddTask && <AddTask onAdd={addTask} /> }
            {tasks.length > 0 ? 
            
            <Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder} 
              /> 
              : (
                'No tasks available'
                )
              }
          </>
        } />
      </Routes>

{/* here we added the path along side About that is the component we created and imported  */}
      <Routes> 
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
    </div>
    </Router>


  );
}

export default App;
