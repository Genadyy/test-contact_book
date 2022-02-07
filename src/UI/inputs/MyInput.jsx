import React from 'react';
import classes from './MyInput.module.css';


const MyInput = (props) => {
    const {className, type, value, action,placeholder} = props;
    
    return (
        <input
            className={classes[className]}
            type={type}
            value={value}
            onChange={action}
            placeholder={placeholder}
        />
    )
}


export default MyInput;