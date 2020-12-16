import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ greeting }) => {
  return (
    <div>
      {greeting} World
    </div>
  );
};

ReactDOM.render(<App greeting="Hello" />, document.getElementById('react'));