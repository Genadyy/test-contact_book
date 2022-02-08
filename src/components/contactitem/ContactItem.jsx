import React from 'react';
import {Link} from 'react-router-dom';
import MyInput from './../../UI/inputs/MyInput';
import MySelect from './../../UI/selectors/MySelect';
import MyButton from './../../UI/buttons/MyButton';
import classes from './ContactItem.module.css';


const ContactItem = (props) => {
    const  {contact, contacts, contactItem, clearInput, handleSelect,
            handleInputItemValue, addContactItem, editContactItem, removeContactItem,
            rejectEdit} = props;

   

    const kindType = (str) => {
        switch(str) {
            case 'phone':
                return 'number';
            case 'e-mail': 
                return 'email';
            case 'telegram':
                return 'text';
            case 'date of birth':
                return 'date';
            default: return 'text'
        }
    }

    

    return (
        <div className={classes.page}>
            <Link to='/test-contact_book' className={classes.link} onClick={clearInput}>{`< back to the contact list >`}</Link>
            <h1 className={classes.title}>{contact.name} {contact.lastName}</h1>
            <div className={classes.content}>
                <div className={classes.form}>
                    <MySelect id='select' className='select' action={handleSelect}/>
                    <MyInput
                    className='list_input'
                    type={kindType(contactItem.name)}
                    value={contactItem.value}
                    action={handleInputItemValue}
                    placeholder='put contact'
                    />
                    <MyButton className={['green', 'btn']} action={() => addContactItem(contact.id)}>add info</MyButton>
                    <MyButton className={['yellow', 'btn']} action={() => editContactItem(contact.id)}>edit info</MyButton>
                </div>    
                <div className={classes.info}>
                    { 
                        Object.entries(contacts.find(item => item.id === contact.id)).map(
                        (item , index) =>(item[0] === 'id')? <div key={index}></div> :  (item[0] === 'name') ? 
                        <div key={index} className={classes.info_item}> 
                                {`name: ${item[1]}`}
                            </div> :
                        (item[0] === 'lastName')?
                            <div key={index} className={classes.info_item}> 
                                {`last name: ${item[1]}`}
                            </div> : 
                            <div key={index} className={classes.info_item}> 
                                <div>{item[0] + ': ' + item[1]}</div>
                                <div>
                                    <MyButton className={['red', 'btn']} action={(e) => removeContactItem(contact.id, e)} name={item[0]} >
                                        delete info
                                    </MyButton>
                                    <MyButton className={['purple', 'btn']} action={(e) => rejectEdit(contact.id, e)} name={item[0]}>
                                        reject editing
                                    </MyButton> 
                                </div>    
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default ContactItem;

