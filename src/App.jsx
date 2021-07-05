import React, { useState } from 'react';
import { Octokit } from "@octokit/core";
import '../index.css';
const octokit = new Octokit();

const App = () => {
  
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [language, setLanguage] = useState('javascript');
  const [showDetails, setShowDetails] = useState('false');
  // state: flag to trigger conditional render of detailed result page
  // passing down pertinent query results as props

  const searchSubmit = () => {
    /*
      sort results by default best match or by stars
      filter results by language
    */
    const queryString = sortBy === 'default' ? `${input} in:name language:${language}` : `${input} in:name&sort=stars language:${language}`
    console.log(queryString)

    octokit.request('GET /search/repositories', {
      q: queryString
    })
    .then((res) => {
      console.log(res.data.items)
      setQueryResult(res.data.items);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  const toggleSort = () => {
    setSortBy(sortBy === 'default' ? 'stars' : 'default')
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
    </div>
  );
}

export default App;