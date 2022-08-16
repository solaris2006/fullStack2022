const Header = (props) => <h2>{props.course.name}</h2>;

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ course }) => {
  const sum = course.parts.reduce(
    (partialSum, a) => partialSum + a.exercises,
    0
  );

  return <p>Number of exercises {sum}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
