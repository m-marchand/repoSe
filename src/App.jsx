import React, { useState } from 'react';
import { Octokit } from "@octokit/core";
const octokit = new Octokit();

const App = () => {
  
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  // state: flag to trigger conditional render of detailed result page
  // passing down pertinent query results as props

  const searchSubmit = () => {
    /*
      sort results by default best match or by stars
      filter results by language
      in:name --> search repo by name
      language:LANGUAGE --> rails language:javascript matches repos with the word "rails" that are written in JS
      Matthew Coolest in:name language:javascript
      https://api.github.com/search/repositories?q=jquery%20in%3Aname%20sort%3Dstart%20order-desc
    */
    octokit.request('GET /search/repositories', {
      q: 'jquery in:name&sort=start&order-desc'
    })
    .then((res) => {
      console.log(res.data.items);
    })
    .catch((err) => {
      console.log(err);
    })
    
   
  }

  return (
    <div className='App'>
      Search:<br/>
      <input type='text' onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={searchSubmit}>Submit</button>
    </div>
  );
 
}

export default App;