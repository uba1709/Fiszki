"use client";
import React, { useState } from 'react';
import Typewriter from './Typewriter';

export default function Main() {
    const text = 'Twoja droga do wiedzy zaczyna się tutaj!';
    const postText = 'Twoje fiszki. Twoje tempo. Twój progres. Stwórz pierwszą notatkę i zacznij naukę.';
    const [showPost, setShowPost] = useState(false);

    function handleFirstComplete() {
      setTimeout(() => setShowPost(true), 500);
    }

    return (
        <main>
            <div className="container">
                <h1><Typewriter text={text} speed={40} onComplete={handleFirstComplete} /></h1>
                <h2>{showPost ? <Typewriter text={postText} speed={35} /> : null}</h2>
            </div>
            <div className='aboutWeb'>
                <div className='mainContainer'>
                    <h1></h1>
                </div>
            </div>
        </main>
    );
}