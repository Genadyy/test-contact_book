import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactList from './components/contactList/ContactList';
import ContactItem from './components/contactitem/ContactItem';
import './App.css';

const App = () => {
    const [contact, setContact] = useState({name: '', lastName: ''});
    const [contactItem, setContactItem] = useState({name: '', value: ''});
    const [prevValue, setPrevValue] = useState([]);
    const [contacts, setContacts] = useState([
      {id: 1, name: 'Bob', lastName:'Boob'},
      {id: 2, name: 'Jimmy', lastName: 'Carter'},
      {id: 3, name: 'Julia', lastName: 'Hacksmith'}
    ]);


const handleInputName = (e) => {
  setContact({...contact, name: e.target.value})
}
const handleInputLastName = (e) => {
  setContact({...contact, lastName: e.target.value})
}
const handleOnClick = (e) => {
  setContact(contacts.find(item => item.id == e.target.getAttribute('dataid')))
}

const clearInput = () => {
  setContact({name: '', lastName: ''})
}

const addContact = () => {
  if(contact.name === '' || contact.lastName ==='') {
    alert("You have to put the full name of person")
  } else {
  setContacts([...contacts, {...contact, id: Date.now()}]);
  }
  clearInput();
}

const removeContact = (id) => {
  const confirm = window.confirm("Are you sure you want to delete this contact?")
  if(confirm) {
    setContacts(contacts.filter(contact => contact.id !== id))
  }
}


const handleInputItemValue = (e) => {
     setContactItem({...contactItem, value: e.target.value})
}

const handleSelect = (e) => {
  setContactItem({...contactItem, name: e.target.value})
  
}

const addContactItem = (id) => {
  if(contactItem.name === '' || contactItem.value === '') {
    alert("You have to put info")
  } else {
  setContacts(contacts.map(item => {
    if(item.id !== id) {
          return item
      } else if(item.id === id && Object.keys(item).includes(contactItem.name)) {
          alert("This info already exist. You can edit it if you want")
          return item
      } else {
          return {
            ...item,
            [contactItem.name]: contactItem.value
        }
       
     } 
     
  }))
    setContactItem({name: '', value:''});
    document.getElementById('select').value = 'Choose kind of contact';
  }
}

const editContactItem = (id) => {
  const confirm = window.confirm('Do you want to edit?');
  if(confirm && contactItem.name === '') {alert('You have to specified info')}
  if(confirm && contactItem.name !== '') {
  setContacts(contacts.map(item => {
    if(item.id !== id) {
      return item
    } else if(!Object.keys(item).includes(contactItem.name)){
      window.alert("You can't edit what doesn't exist")
        return item
        
      } else {
      
      setPrevValue([...prevValue, item])
    
      return {
        ...item,
        [contactItem.name]: contactItem.value
      }
    }
  })) 
  
  setContactItem({name: '', value: ''});
  document.getElementById('select').value = 'Choose kind of contact';
} else {
  setContactItem({name: '', value: ''});
  document.getElementById('select').value = 'Choose kind of contact';
  }
  
}



const rejectEdit = (id, e) => {
  console.log(id);
  const prevValueItem = prevValue.find(item => item.id === id);
  console.log(prevValueItem);
  if(prevValueItem === undefined) {alert("You haven't edited yet"); return}
  if(prevValueItem.id === id) {
    const confirm = window.confirm('Are you sure you want to reject editing?');

    if(confirm) {
      setContacts(contacts.map(item => {
        if(item.id !== id) {
          return item;
        } else if (item.id === id) {
          return {
            ...item,
            [e.target.getAttribute('name')]: prevValueItem[e.target.getAttribute('name')]  
          }  
        }
      }))
    } 
  }
}


const removeContactItem = (id, e) => {
 
  const confirm = window.confirm('Are you sure you want delete this info?');
    if(confirm) {
    setContacts(contacts.map(item => {
      if(item.id !== id) {
        return item
      } else {
        delete item[e.target.getAttribute('name')]
        return item
      }
    }))
  }
}


  return (
    <BrowserRouter>
      <div className="App">
          <h1 className='title'>Contact Book</h1>
       
        <Routes> 
          <Route exact path = '/test-contact_book' element = {
              <ContactList 
                contact={contact}
                contacts={contacts}
                handleInputName={handleInputName}
                handleInputLastName={handleInputLastName}
                addContact={addContact}
                removeContact={removeContact}
                handleOnClick={handleOnClick}
                clearInput={clearInput}
                
              />
            }
          /> 

          <Route  path={`/contact_item/:${contact.name}_${contact.lastName}`}
                 element={
                   <ContactItem
                    contact={contact}
                    contacts={contacts}
                    contactItem={contactItem}
                    clearInput={clearInput}
                    handleSelect={handleSelect}
                    handleInputItemValue={handleInputItemValue}
                    addContactItem={addContactItem}
                    editContactItem={editContactItem}
                    removeContactItem={removeContactItem}
                    rejectEdit={rejectEdit}
                    
                   
                   />
                 } 
          
          />   
        </Routes>    
      </div>
    </BrowserRouter>
  )
}

export default App;
