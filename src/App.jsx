import React, { useState } from 'react';
import { Octokit } from "@octokit/core";
import Display from './Display.jsx'
import '../index.css';

const App = () => {
  
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [language, setLanguage] = useState('javascript');

  const searchSubmit = () => {
    /*
      sort results by best match (default) or by stars
      & filter results by language
    */
    const queryString = 
      sortBy === 'default' 
      ? `${input} in:name language:${language}` 
      : `${input} in:name&sort=stars language:${language}`;
    
    const octokit = new Octokit();
    octokit.request('GET /search/repositories', {
      q: queryString
    })
    .then((res) => setQueryResult(res.data.items))
    .catch((err) => console.log('Error querying GitHub API:' + err))
  }

  const toggleSort = () => {
    setSortBy(sortBy === 'default' ? 'stars' : 'default');
  }

  return (
    <div className='App'>
      Search:<br/>
      <input type='text' onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={searchSubmit}>Submit</button><br/>
      <div id='sortBy' onClick={toggleSort}>
        Sort results by:
        <input type='radio' value='Best Match' name='sortButton' defaultChecked />Best Match
        <input type='radio' value='Stars' name='sortButton' />Stars
      </div>
      <div id='searchLanguage'>
        Search by language: 
        <input type='text' onChange={(e) => setLanguage(e.target.value)}></input>
      </div>
      <Display data={queryResult}/>
    </div>
  );
}

export default App;