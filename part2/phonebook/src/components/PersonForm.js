const PersonForm = (props) => {
 ;
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div>
          name :{" "}
          <input onChange={props.handleNameChange} value={props.newName} />
        </div>
        <div>
          number :{" "}
          <input onChange={props.handleNumberChange} value={props.number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
