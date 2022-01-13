import React, { useState } from 'react';
import DetailDisplay from './DetailDisplay.jsx'
import '../index.css';

const ResultsDisplay = ({ data }) => {

  const [showDetails, setShowDetails] = useState(false);
  const [detailedStudy, setDetailed] = useState(undefined);

  const setStudy = (repo) => {
    setShowDetails(true);
    setDetailed(repo);
  }

  {
    return showDetails === true 
      ? (
        <div>
          <DetailDisplay repo={detailedStudy} /> 
          <button onClick={() => setShowDetails(false)}>Back</button>
        </div>
        
      )
      : data.map(repo => (
        <a key={repo.id} className='new-line results-view' onClick={() => setStudy(repo)}>
          {`\n ${repo.full_name}`}
        </a>
      ));
  }
  
}

export default ResultsDisplay;