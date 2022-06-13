const Total = ({ course }) => (
  <>
    <h4>
      total of exercises
      {course.parts.reduce(
        (prevVal, currentVal) => prevVal + currentVal.exercises,
        0
      )}
    </h4>
  </>
);

export default Total;
