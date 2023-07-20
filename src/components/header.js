import React from 'react'
// it is a react hook
// it helps us to get the location we are at
import { useLocation } from 'react-router-dom'
// shortcut impt
import PropTypes from 'prop-types'
import Button from './button'

// const Header = (props) => {
    const Header = ({ title, onAdd, showAddBtn }) => {
    // passing props as the parameter
        // onclick is being passed as a prop coz all the buttons won't perform the same function


        // making a constant to use useLocation
        const location = useLocation();
    return (
        <header className='header'>
        {/* <h1>{props.title}</h1> */}
        {/* doing this is not ideal so we will be destructuring the props object which is Header.defaultProps and write the below code instead */}
        <h1>{title}</h1>
        {/* the onCick is a default property which gives us the event of click
        the second onClick is the constant we made which will execute a function
        */}


        {/* we used location in a condition so that we can only have the button in the homepage */}
        {  location.pathname === '/' && showAddBtn ? <Button color='red' text='Close' onClick={onAdd}/> 
        :
        location.pathname === '/' &&  <Button color='black' text='Add' onClick={onAdd}/>}

{/* shortcut for the above code */}
        {/* {
            location.pathname === '/' && (
                <Button 
                    color={showAddBtn ? 'red' : 'black'}
                    text={showAddBtn ? 'Close' : 'Add'}
                    onClick={onAdd}
                />
            )
        } */}
        {/* here color and text are props */}
        {/* that is a reuseable code  */}
        {/* <Button color='red' text='get photos' /> */}
        {/* <Button color='blue' text='get users' /> */}
        </header>
    )
}

// this is how you add default props
// this will be used when no prop is passed in
    Header.defaultProps = {
        title : 'Task Tracker'
    }

// here we declare the type of property
    Header.propTypes = {
        title: PropTypes.string.isRequired
        // now if we pass in any number it will be rendered but an error will be displayed in the console regarding the property not being the type as required
    }

export default Header