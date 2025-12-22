"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const signUsernameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setSignOpen(false); }
    }
    if (open || signOpen) {
      document.addEventListener('keydown', onKey);
      setTimeout(() => {
        if (open) usernameRef.current?.focus();
        else if (signOpen) signUsernameRef.current?.focus();
      }, 80);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [open, signOpen]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    console.log('Login attempt', { username: form.get('username'), password: form.get('password') });
    setOpen(false);
  }

  function handleSignUpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    console.log('Sign up attempt', { name: form.get('name'), email: form.get('email') });
    setSignOpen(false);
  }

  return (
    <header>
      <div className="flex">
        <div className="containerNav">
          <div className="logo">Fiszki</div>

          <div className="nav-actions">
            {/* <a className="nav-link" href="#about">O stronie</a> */}
          </div>

          <div className="nav-actions">
            <div className="nav_LogIn-Button">
              <a
                className="nav-btn"
                onClick={() => { setOpen(true); setSignOpen(false); }}
                aria-expanded={open}
                aria-controls="login-panel"
              >
                Log in
              </a>
            </div>
            <div className="nav_SignUp-Button">
              <a
                className="nav-btn"
                onClick={() => { setSignOpen(true); setOpen(false); }}
                aria-expanded={signOpen}
                aria-controls="signup-panel"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      {(open || signOpen) && <div className="login-overlay" onClick={() => { setOpen(false); setSignOpen(false); }} />}

      {/* LOGIN PANEL */}
      <aside
        id="login-panel"
        className={"login-panel " + (open ? 'open' : '')}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
      >
        <div className="panel-head">
          <strong>Zaloguj</strong>
          <button className="panel-close" aria-label="Zamknij" onClick={() => setOpen(false)}>×</button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input name="username" ref={usernameRef} placeholder="Email lub użytkownik" autoComplete="username" />
          <input name="password" type="password" placeholder="Hasło" autoComplete="current-password" />

          <div className="login-actions">
            <a className="forgot" href="#forgot">Zapomniałeś hasła?</a>
            <button type="submit" className="btn-glass">Zaloguj</button>
          </div>
        </form>
      </aside>

      {/* SIGNUP PANEL */}
      <aside
        id="signup-panel"
        className={"login-panel " + (signOpen ? 'open' : '')}
        role="dialog"
        aria-modal={signOpen}
        aria-hidden={!signOpen}
      >
        <div className="panel-head">
          <strong>Zarejestruj się</strong>
          <button className="panel-close" aria-label="Zamknij" onClick={() => setSignOpen(false)}>×</button>
        </div>

        <form className="login-form" onSubmit={(e) => handleSignUpSubmit(e)}>
          <input name="name" ref={signUsernameRef} placeholder="Nazwa użytkownika" autoComplete="name" />
          <input name="email" type="email" placeholder="Email" autoComplete="email" />
          <input name="password" type="password" placeholder="Hasło" autoComplete="new-password" />
          <input name="passwordConfirm" type="password" placeholder="Powtórz hasło" autoComplete="new-password" />

          <div className="login-actions">
            <a className="forgot" href="#login" onClick={(e) => { e.preventDefault(); setSignOpen(false); setOpen(true); }}>Masz konto? Zaloguj się</a>
            <button type="submit" className="btn-glass">Zarejestruj</button>
          </div>
        </form>
      </aside>
    </header>
  );
}
