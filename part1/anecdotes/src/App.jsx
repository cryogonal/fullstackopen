import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>  
      {props.text}
    </button>
  )
}

const Votes = ({votes, selected}) => {
  if (selected in votes) {
    return <p>has {votes[selected]} votes</p>
  }
  else {
    return <p>has 0 votes</p>
  }
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const randomElement = () => {
    const randomIndex = [Math.floor(Math.random() * anecdotes.length)];
    setSelected(randomIndex)
  }

  const HandleVotes = () => {
    const copyVotes = {...votes}
    if (selected in copyVotes) {
      copyVotes[selected] += 1
    }
    else {
      copyVotes[selected] = 1
    }
    setVotes(copyVotes)
  }

  const maxVotes = () => {
    let maxVote = 0;
    let maxVotesIndex = null;
  
    for (const index in votes) {
      if (votes[index] > maxVote) {
        maxVote = votes[index];
        maxVotesIndex = index;
      }
    }
    return maxVotesIndex;
  };

  console.log("random number: ", selected)

  const maxVotesIndex = maxVotes();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <Votes votes = {votes} selected = {selected} />
      <Button handleClick = {HandleVotes} text = "vote" />
      <Button handleClick = {randomElement} text = "next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
    </div>
  )
}

export default App
