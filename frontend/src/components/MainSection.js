import React from 'react';
import Board from "./Board";
import SpeedButton from "./SpeedButton"
import { Button } from 'reactstrap';

const MainSection = ({ total, shops, multiplicateur, actions, test }) =>(
      <div>
        <h2 align="center">Welcome to Rail Capitalist!</h2>
        <hr />
        <Button onClick={() => actions.increment(1000)}>Ajouter 1000</Button>
        <Button onClick={() => actions.increment(1000000)}>Ajouter 1M</Button>
        <br/>
        <h1 align="center">$: {document.title = total}</h1>
        <SpeedButton multiplicateur={actions.multiplicateur}/>
        <table>
                <tbody>
                <tr >
                {shops.map((elm) => {
                        return <td height="500" valign="top" key={elm.id}><Board
                            actions={actions}
                            shop={elm}
                            key={elm.id}
                            total={total}
                            multiplicateur={multiplicateur}
                        /></td>
                })}
                </tr>
                </tbody>
        </table>
      </div>
)
export default MainSection