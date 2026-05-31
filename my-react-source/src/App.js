import React from 'react';


function App() {
  const list = Array(10000).fill(0)
  return (
    <div className="App">
      {
        list.map((item, idx) => {
          return <li key={idx}>{idx}</li>
        })
      }
    </div>
  );
}

export default App;
