const Persons = (props) => {
  return (
    <>
      {props.personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
