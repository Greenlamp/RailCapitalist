import React from 'react';
import Board from "./Board";

const MainSection = ({ total, actions }) =>(
      <div>
        <h2>Welcome to Rail Capitalist!</h2>
        <hr />
        <button onClick={actions.increment}>increment</button>
        <br/>
        Total: {total}
        <Board increment={actions.increment}/>
        <Board increment={actions.increment}/>
        <Board increment={actions.increment}/>
      </div>
)
export default MainSection