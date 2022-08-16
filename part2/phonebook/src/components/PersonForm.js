const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  newNumber,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>
        number : <input value={newNumber} onChange={handleNumberChange}></input>
      </div>
      <br />
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
