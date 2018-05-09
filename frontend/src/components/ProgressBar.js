import React from 'react';

const ProgressBar = ({ progress, gain }) =>(
  <div className="progressbar">
    <div className="progress"style={{ width: `${progress}%`}}>
        <b>($){gain}</b>
    </div>
  </div>
)
export default ProgressBar