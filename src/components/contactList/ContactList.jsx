import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import MyButton from './../../UI/buttons/MyButton';
import MyInput from './../../UI/inputs/MyInput';
import classes from './ContactList.module.css';

const ContactList = (props) => {
    const  {contact, contacts, handleInputName, handleInputLastName,
            addContact, removeContact, handleOnClick, clearInput} = props;

    useEffect(() => {
        clearInput();
       
    }, []);
    
    return (
        <div className={classes.list_page}>
            <div className={classes.form} >
                <MyInput 
                    className={'list_input'}
                    type='text'
                    value={contact.name}
                    action={handleInputName}
                    placeholder='put your name'
                />
                 <MyInput
                    className={'list_input'}
                    type='text'
                    action={handleInputLastName}
                    value={contact.lastName}
                    placeholder='put your last name'
                />
                <MyButton className={['green', 'btn', 'btn1']}  action={addContact}>add contact</MyButton>
            </div>
            <div className={classes.list}>
            
                {contacts.length === 0? <h2 className={classes.title}>Your contact list is empty</h2>:
                 contacts.map((item, index) =>  
                
                    <div key={item.id} className={classes.list_item}>
                        
                        <Link to={`/contact_item/:${item.name}_${item.lastName}`} className={classes.list_a} onClick={handleOnClick} dataid={item.id} >{index + 1}.  {item.name} {item.lastName}</Link> 
                        <MyButton className={['red', 'btn']} action={() =>removeContact(item.id)}>
                           delete
                        </MyButton>
                    </div>
                )}
            </div>
        </div>
    )
}


export default ContactList;