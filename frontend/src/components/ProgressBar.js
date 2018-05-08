import React from 'react';

const ProgressBar = ({ progress }) =>(
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%`}}>
    </div>
  </div>
)
export default ProgressBar