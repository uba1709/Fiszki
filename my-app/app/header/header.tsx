"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [user, setUser] = useState<number | null>(null);
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

  // check session on mount
  useEffect(() => {
    fetch('me.php', { credentials: 'include' })
      .then(res => res.json())
      .then(data => { if (data.logged) setUser(data.userId); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = { email: form.get('username'), password: form.get('password') };

    try {
      const res = await fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important to receive session cookie
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.ok) {
        setUser(result.userId);
        setOpen(false);
      } else {
        alert(result.error || 'Błąd logowania');
      }
    } catch (err) {
      console.error(err);
      alert('Błąd sieci');
    }
  }

  async function handleSignUpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const passwordConfirm = form.get('passwordConfirm');

    if (password !== passwordConfirm) {
      alert('Hasła nie są takie same');
      return;
    }

    try {
      const res = await fetch('register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const result = await res.json();
      if (res.status === 201 && result.ok) {
        // automatically log in the user by calling login
        const loginRes = await fetch('login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });
        const loginJson = await loginRes.json();
        if (loginJson.ok) {
          setUser(loginJson.userId);
          setSignOpen(false);
        }
      } else {
        alert(result.error || 'Błąd rejestracji');
      }
    } catch (err) {
      console.error(err);
      alert('Błąd sieci');
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch('logout.php', { method: 'POST', credentials: 'include' });
      const data = await res.json();
      if (data.ok) setUser(null);
    } catch (err) {
      console.error(err);
    }
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
            {user ? (
              <>
                <span className="nav-user">Użytkownik #{user}</span>
                <button className="nav-btn" onClick={handleLogout}>Wyloguj</button>
              </>
            ) : (
              <>
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
              </>
            )}
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

        <form action={'login.php'} className="login-form" onSubmit={handleSubmit}>
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
