const Filter = ({ filterNumbers }) => {
  return (
    <div>
      {" "}
      filter shown with <input onChange={filterNumbers} />
    </div>
  );
};

export default Filter;
