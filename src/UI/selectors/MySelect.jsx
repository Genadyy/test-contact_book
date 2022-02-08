import React from 'react';
import classes from './MySelect.module.css';



const MySelect = (props) => {
 const {id, action, className} = props

    return (
        <div>
            <select id= {id} className={classes[className]} onChange={action}>
                <option  defaultValue = 'Choose kind of contact' >Choose kind of info</option>
                <option value = 'date of birth'>Date of birth</option>
                <option value = 'phone'>Phone</option>
                <option value = 'e-mail'>E-mail</option>
                <option  value = 'telegram'>Telegram</option> 
                   
            </select>
        </div>
    )
}



export default MySelect;