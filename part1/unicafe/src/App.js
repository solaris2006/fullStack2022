import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.txt}</button>;

const StatisticLine = ({ text, statisic }) => (
  <tr>
    <td> {text}</td>
    <td> {statisic}</td>
  </tr>
);

const Statistics = ({ clicks }) => {
  const all = (clicks) => clicks.good + clicks.bad + clicks.neutral;

  const average = (clicks) =>
    (clicks.good * 1 + clicks.bad * -1 + clicks.neutral * 0) / all(clicks);

  const positive = (clicks) => clicks.good / all(clicks);

  if (clicks.bad == 0 && clicks.good == 0 && clicks.neutral == 0) {
    return (
      <div>
        <p> No feedback given </p>
      </div>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine statisic={clicks.good} text="good" />
          <StatisticLine statisic={clicks.neutral} text="neutral" />
          <StatisticLine statisic={clicks.bad} text="bad" />
          <StatisticLine statisic={average(clicks)} text="average" />
          <StatisticLine statisic={positive(clicks)} text="positive" />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
    });
  };

  const handleNeutral = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
    });
  };

  const handleBad = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
    });
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} txt="good" />
      <Button onClick={handleNeutral} txt="neutral" />
      <Button onClick={handleBad} txt="bad" />

      <h2>statistics</h2>
      <Statistics clicks={clicks} />
    </div>
  );
};

export default App;
