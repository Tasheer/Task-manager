import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, text, onClick }) => {
    return (
        <button 
        // we made a button and passed props color and text in header.js this helps us to reuse the same code again 
        // here style and text don't are now variables whose values can be changed so if we want to make more  buttons we can just use the same code again and just change the color and text of the button and there wouldn't be any need of writing this code again
            style={{backgroundColor:color}} 
            className='btn'
            onClick={onClick}
        > 
            {text} 
        </button>
    )
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    // it is a function that's why we used func
    onClick: PropTypes.func
}

export default Button;