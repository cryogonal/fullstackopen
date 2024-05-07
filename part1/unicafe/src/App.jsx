import { useState } from "react"

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Header = ({header}) => {
  return (
    <div>
      <h1> {header} </h1>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No feedback</p>
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticLine text = "good" value = {good} />
          <StatisticLine text = "neutral" value = {neutral} />
          <StatisticLine text = "bad" value = {bad} />
          <StatisticLine text = "all" value = {good + neutral + bad} />
          <StatisticLine text = "average" value = {(good - bad) / (good + bad + neutral)} />
          <StatisticLine text = "positive" value = {((good / (good + bad + neutral))) * 100 + "%"} />
        </tbody>
      </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {
    setGood(good + 1);
  };

  const setToNeutral = () => {
    setNeutral(neutral + 1);
  };

  const setToBad = () => {
    setBad(bad + 1);
  };


  return (
    <div>
      <Header header = {"Give feedback"}></Header>
      <Button handleClick = {setToGood} text = "good" />
      <Button handleClick = {setToNeutral} text = "neutral" />
      <Button handleClick = {setToBad} text = "bad" />
      <Header header = {"Statistics"}></Header>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App