import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const PersonForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <legend>Add user</legend>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Name </Form.Label>
        <Form.Control
          type="text"
          onChange={props.handleNameChange}
          value={props.newName}
          controlid="name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="number">Number </Form.Label>

        <Form.Control
          type="text"
          onChange={props.handleNumberChange}
          value={props.number}
          controlid="number"
        />
      </Form.Group>

      <div>
        <Button type="submit">Add</Button>
      </div>
    </Form>
  );
};

export default PersonForm;
