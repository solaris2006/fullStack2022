const Filter = (props) => {
  return (
    <>
      Filter shown with
      <input type="text" onChange={props.onChange} />
    </>
  );
};

export default Filter;
