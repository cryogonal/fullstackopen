import { useState, useEffect } from 'react'


const Names = ({person}) => {
  return (
    <div>
      {person.name} {person.number}
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

const Persons = ({filter}) => {
  return (
    <div>
      {filter.map((person) => {
          return <Names key = {person.name} person = {person} />
        })}
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filter, setFilter] = useState(props.persons)

  
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(filter.concat(personObject))
    setFilter(filter.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      />
      <h2>Numbers</h2>
      <Persons filter = {filter} />
    </div>
  )
}

export default App