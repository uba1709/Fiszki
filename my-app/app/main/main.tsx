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
            <div className='aboutWeb' id="about">
                <div className='mainContainer' role="list">
                    <article className='feature-card' role="listitem" style={{ animationDelay: '0ms' }}>
                        <div className='feature-icon' aria-hidden>🧠</div>
                        <h4>Twórz fiszki</h4>
                        <p>Twórz krótkie fiszki szybko i wygodnie. Dodaj notatki i tagi, aby lepiej organizować naukę.</p>
                    </article>

                    <article className='feature-card' role="listitem" style={{ animationDelay: '120ms' }}>
                        <div className='feature-icon' aria-hidden>⚡</div>
                        <h4>Szybka powtórka</h4>
                        <p>Powtarzaj efektywnie dzięki inteligentnym sesjom, które dopasowują się do twojego rytmu.</p>
                    </article>

                    <article className='feature-card' role="listitem" style={{ animationDelay: '240ms' }}>
                        <div className='feature-icon' aria-hidden>📈</div>
                        <h4>Śledź progres (Zapowiedź )</h4>
                        <p>Obserwuj postępy, ustawiaj cele i śledź swoje wyniki w prosty sposób.</p>
                    </article>
                </div>
            </div>
        </main>
    );
}