import { InputGroup, Form } from 'react-bootstrap';

const Filter = (props) => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>Filter shown with</InputGroup.Text>
        <Form.Control onChange={props.onChange} />
      </InputGroup>
    </>
  );
};

export default Filter;
