import React, { useState } from 'react';
import '../index.css';

const Display = (props) => {
  const [showDetails, setShowDetails] = useState('false');
  // state: flag to trigger conditional render of detailed result page
  // passing down pertinent query results as props

  return <div>{props.data.length > 0 ? 'got the data' : 'Loading'}</div>
}

export default Display;