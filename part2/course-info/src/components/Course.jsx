const Total = ({parts}) => {
  const total = parts.reduce((a, b) => {
    console.log(a, b)
    return {exercises: a.exercises + b.exercises}
  });

  return (
    <p>
      <b>total of {total.exercises} exercises</b>
    </p>
  )

}

const Part = ({ name, exercises }) => {
  return (
    <p>
    {name} {exercises}
    </p>
  )

}

const Course = ({course}) => {
  return <div>
    <h1>{course.name}</h1>
    {course.parts.map((part) => <Part key = {part.id} name = {part.name} exercises = {part.exercises} />)}
    <Total parts = {course.parts} />
  </div>
}

export default Course