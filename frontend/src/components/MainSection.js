import React from 'react';
import Board from "./Board";

const MainSection = ({ total, shops, multiplicateur, actions, test }) =>(
      <div>
        <h2>Welcome to Rail Capitalist!</h2>
        <hr />
        <button onClick={actions.incrementByOne}>increment</button>
        <br/>
        <h1 align="center">$: {document.title = total}</h1>
        <button onClick={() => actions.multiplicateur(1)}>X1</button>
        <button onClick={() => actions.multiplicateur(10)}>X10</button>
        <button onClick={() => actions.multiplicateur(100)}>X100</button>
        <button onClick={() => actions.multiplicateur(1000)}>X1000</button>
        <button onClick={() => actions.multiplicateur(10000)}>X10000</button>
        <button onClick={() => actions.multiplicateur(100000)}>X100000</button>
        <button onClick={() => actions.multiplicateur(1000000)}>X1000000</button>
        <table><tr>
        {shops.map((elm) => {
                return <td><Board
                    actions={actions}
                    shop={elm}
                    key={elm.id}
                    total={total}
                    multiplicateur={multiplicateur}
                /></td>
        })}
        </tr>
        </table>
      </div>
)
export default MainSection