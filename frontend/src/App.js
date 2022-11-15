import React, { useState } from 'react';
import { socket } from './index';

const App = () => {
  const [input, setInput] = useState("")

  return (
    <div>
      <h1 className='text-3xl font-bold'>App.js</h1>
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => {
          console.log("send message")
          socket.emit("message", { messsage: input})
        }
      }>Send Message</button>
    </div>
  );
}

export default App;
