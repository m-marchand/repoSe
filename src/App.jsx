import React, { useState } from 'react';
import { Octokit } from "@octokit/core";
import '../index.css';
const octokit = new Octokit();

const App = () => {
  
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [language, setLanguage] = useState('javascript')
  // state: flag to trigger conditional render of detailed result page
  // passing down pertinent query results as props

  const searchSubmit = () => {
    /*
      sort results by default best match or by stars
      filter results by language
      in:name --> search repo by name
      language:LANGUAGE --> rails language:javascript matches repos with the word "rails" that are written in JS
      Matthew Coolest in:name language:javascript
      'jquery in:name&sort=stars&order=desc'
    */
    let queryString;
    queryString = sortBy === 'default' ? `${input} in:name language:javascript` : `${input} in:name&sort=stars language:javascript`
    
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
      <div className='sortBy' onClick={toggleSort}>
        Sort results by:
        <input type='radio' value='Best Match' name='sortButton' defaultChecked />Best Match
        <input type='radio' value='Stars' name='sortButton' />Stars
      </div>
    </div>
  );
 
}

export default App;