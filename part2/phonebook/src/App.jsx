import { useState, useEffect } from 'react'
//import axios from 'axios'
import nameService from './services/name'
import './index.css'

 /* const Notification = ({successfulMessage}) => {
  if (successfulMessage === null) {
    return null;
  }
  return (
    <div className = 'successful-message'>{successfulMessage}</div>
  )
} */

const Names = ({person, removePerson}) => {
  return (
    <div>
      {person.name} {person.number} <button onClick = {() => removePerson(person.id, person.name)}>delete</button>
    </div>
  )
}

const SearchFilter = ({searchPerson, handleSearchPerson}) => {
  return(
    <div>
      filter shown with: <input value = {searchPerson} onChange = {handleSearchPerson} />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange = {handlePersonChange} />
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
} 

const Persons = ({filter, removePerson}) => {
  return (
    <div>
      {filter.map((person) => {
          return <Names key = {person.name} person = {person} removePerson = {removePerson}/>
        })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filter, setFilter] = useState([])
  const [successfulMessage, setSuccessfulMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const Notification = ({message, isError}) => {
    if (!message) {
      return null
    }
    const className = isError ? 'error-message' : 'successful-message'

    return (
      <div className = {className}>{message}</div>
    )
  }

  const hook = () => {
    console.log('effect')
    nameService.getAll()
      .then(initialPerson => {
        console.log("promise fulfilled")
        setPersons(initialPerson)
        setFilter(initialPerson)
      })
      .catch(error => {
        console.error("error fetching data: ", error)
      })
  }
  useEffect(hook, [])
  console.log("rendered", persons.length, "persons")
  
  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (nameExists) {
      const confirmedName = window.confirm(`${newName} is already added to phonebook, replace the old one with a new one?`);

      if (!confirmedName) {
        return;
      }
      nameService.update(nameExists.id, personObject).then(updatedPerson => {
          setPersons(prevPerson => {
            prevPerson.id === nameExists.id ? updatedPerson : persons
          })
          setFilter(prevFilter => {
            prevFilter.id === nameExists.id ? updatedPerson : persons
          })
          setSuccessfulMessage(`${updatedPerson.name} has been updated`)
          setTimeout(() => {
            setSuccessfulMessage('')
          }, 4000)
        })
        .catch(error => {
          console.log("Error updating the number", error.message)
          setErrorMessage(`${nameExists.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage('')
          }, 4000)
          //alert("Error updating the number")
        })
    }
    else {
        nameService.create(personObject)
          .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setFilter(filter.concat(returnedPerson))
          setSuccessfulMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessfulMessage('')
          }, 4000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => {
  const confirmDelete = window.confirm(`Do you want to remove ${name}?`)
  if (!confirmDelete) {
    return;
  }
    nameService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setFilter(filter.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log('error deleting person', error.message)
        alert('error deleting person')
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchPerson = (event) => {
    setSearchPerson(event.target.value);

    const filterPeople = persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(filterPeople)
  }
 
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {successfulMessage} isError = {false} />
      <Notification message = {errorMessage} isError = {false} />
      <SearchFilter 
        searchPerson = {searchPerson} 
        handleSearchPerson = {handleSearchPerson} />
      <h2>
        Add new person
      </h2>
      <PersonForm 
        addPerson = {addPerson} 
        newName = {newName} 
        handlePersonChange = {handlePersonChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
        // successfulMessage = {successfulMessage}
      />
      <h2>Numbers</h2>
      <Persons filter = {filter} removePerson = {removePerson}/>
    </div>
  )
}

export default App