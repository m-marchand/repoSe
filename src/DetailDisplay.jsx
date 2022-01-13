import React, { useState } from 'react';
import '../index.css';

const DetailDisplay = ({ repo }) => {
    return (
        <div className='new-line'>
            {
                `
                    Name: ${repo.full_name} \n
                    URL: ${repo.html_url} \n
                    Language: ${repo.language} \n
                    Owner URL: ${repo.owner.url} \n
                `
            }
        </div>
    )
}

export default DetailDisplay;