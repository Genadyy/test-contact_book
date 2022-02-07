import React from 'react';
import classes from './MyButton.module.css';


const MyButton = (props) => {
   const {className, name, action, children} = props;


   const classList = arr => arr.map(item => item = `${classes[item]}`).join(' ')
   
    return (
        <button className={classList(className)} name={name} onClick={action}>{children}</button>
    )
    
}



export default MyButton;