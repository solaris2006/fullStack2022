import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <td>
      {props.text} {props.value}
    </td>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;

  if (total === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No statistics</p>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <StatisticsLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticsLine text="neutral" value={neutral} />
          </tr>

          <tr>
            <StatisticsLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticsLine text="all" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticsLine
              text="average"
              value={(good * 1 - bad * 1) / total}
            />
          </tr>
          <tr>
            <StatisticsLine
              text="positive"
              value={(good / total) * 100 + " %"}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleBad = () => setBad(bad + 1);
  const handleNeutral = () => setNeutral(neutral + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
