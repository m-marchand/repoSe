import React, { useState } from 'react';
import { Octokit } from "@octokit/core";
import ResultsDisplay from './ResultsDisplay.jsx'
import '../index.css';

const App = () => {
  
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [isFetching, setIsFetching] = useState(false)
  const [sortBy, setSortBy] = useState('default');
  const [language, setLanguage] = useState('javascript');

  const searchSubmit = () => {
    /*
      sort results by best match (default) or by stars
      & filter results by language
    */
    setIsFetching(true)
    const queryString = 
      sortBy === 'default' 
      ? `${input} in:name language:${language}` 
      : `${input} in:name&sort=stars language:${language}`;
    
    const octokit = new Octokit();
    octokit.request('GET /search/repositories', {
      q: queryString
    })
    .then((res) => {
      setIsFetching(false)
      setQueryResult(res.data.items)
    })
    .catch((err) => console.log('Error querying GitHub API:' + err))
  }

  const toggleSort = () => {
    setSortBy(sortBy === 'default' ? 'stars' : 'default');
  }

  return (
    <div className='App'>
      <h2>GitHub Repository Search:</h2><br/>
      <span>
        <input type='text' onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={searchSubmit}>Search</button><br/>
      </span>
      <br/>
      <div id='sortBy' onClick={toggleSort}>
        Sort results by:
        <input type='radio' value='Best Match' name='sortButton' defaultChecked />Best Match
        <input type='radio' value='Stars' name='sortButton' />Stars
      </div>
      <div id='searchLanguage'>
        Search by language: 
        <input type='text' onChange={(e) => setLanguage(e.target.value)}></input>
      </div>
      {
        isFetching
          ? <Loading />
          : <ResultsDisplay data={queryResult}/>
      }
      
    </div>
  );
}

const Loading = () => (
  'LO LO LOADING'
)

export default App;