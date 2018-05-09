import React from 'react';
import Board from "./Board";

const MainSection = ({ total, actions }) =>(
      <div>
        <h2>Welcome to Rail Capitalist!</h2>
        <hr />
        <button onClick={actions.incrementByOne}>increment</button>
        <br/>
        Total: {total}
        <Board increment={actions.increment} nom="Aller simple" value={1} time={0.1}/>
        <Board increment={actions.increment} nom="Aller Retour" value={1} time={0.5}/>
        <Board increment={actions.increment} nom="Wagon" value={5} time={1}/>
      </div>
)
export default MainSection