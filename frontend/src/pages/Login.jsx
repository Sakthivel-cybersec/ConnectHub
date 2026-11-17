import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    setMessage('Demo login submitted successfully!')
  }

  return (
    <main className="login-page">
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          font-family: Arial, sans-serif;
          color: #17233d;
          background: #f4f7fc;
        }
        .login-page,
        .login-page * {
          box-sizing: border-box;
        }

        .login-left {
          width: 48%;
          padding: 55px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          background: linear-gradient(145deg, #101f46, #2858ac);
        }
        .login-brand {
          font-size: 26px;
          font-weight: bold;
        }
        .login-brand span {
          display: inline-grid;
          place-items: center;
          width: 42px;
          height: 42px;
          margin-right: 10px;
          border-radius: 12px;
          background: #ffffff25;
        }
        .login-left h1 {
          color: white;
          font-size: clamp(35px, 4vw, 52px);
          line-height: 1.2;
          margin: 0 0 20px;
        }
        .login-left p {
          color: #d5e2fb;
          line-height: 1.8;
        }
        .login-features {
          margin-top: 35px;
          line-height: 3;
          color: #e2ebff;
        }
        .login-footer {
          font-size: 12px;
          color: #b9c9e8;
        }
        .login-right {
          width: 52%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
        }
        .login-form {
          width: 100%;
          max-width: 420px;
        }
        .login-mobile-brand {
          display: none;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 45px;
        }
        .login-form h2 {
          color: #17233d;
          font-size: 32px;
          margin-bottom: 10px;
        }
        .login-subtitle {
          color: #718096;
          margin-bottom: 35px;
        }
        .login-field {
          margin-bottom: 22px;
        }
        .login-field label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 9px;
        }
        .login-field input {
          width: 100%;
          height: 50px;
          padding: 0 14px;
          border: 1px solid #dce3ef;
          border-radius: 9px;
          background: white;
          box-sizing: border-box;
          font-size: 14px;
          outline: none;
        }
        .login-field input:focus {
          border-color: #2858ac;
          box-shadow: 0 0 0 3px #2858ac20;
        }
        .login-field input {
          color: #17233d;
          -webkit-text-fill-color: #17233d;
        }

        .login-field input::placeholder {
          color: #9aa6b8;
          opacity: 1;
        }

        .login-field input {
          color: #17233d;
          -webkit-text-fill-color: #17233d;
        }

        .login-field input::placeholder {
          color: #9aa6b8;
          opacity: 1;
        }

        .login-password {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .login-password input {
          flex: 1;
          min-width: 0;
        }
        .login-password button {
          border: none;
          background: transparent;
          color: #2858ac;
          cursor: pointer;
          font-weight: bold;
        }
        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin: 5px 0 25px;
          font-size: 13px;
        }
        .login-options label {
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
        }
        .login-options input {
          accent-color: #2858ac;
        }
        .login-options button {
          border: none;
          background: transparent;
          color: #2858ac;
          cursor: pointer;
          font-weight: bold;
        }
        .login-submit {
          width: 100%;
          height: 51px;
          border: none;
          border-radius: 9px;
          background: #2858ac;
          color: white;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }
        .login-submit:hover {
          background: #1d448e;
        }
        .login-message {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          background: #eaf1ff;
          color: #254d91;
          font-size: 13px;
        }
        .login-security {
          text-align: center;
          color: #8491a5;
          font-size: 12px;
          margin-top: 28px;
        }
        @media(max-width: 800px) {
          .login-page,
        .login-page * {
          box-sizing: border-box;
        }

        .login-left { display: none; }
          .login-right {
            width: 100%;
            min-height: 100vh;
            box-sizing: border-box;
          }
          .login-mobile-brand { display: block; }
        }
        @media(max-width: 400px) {
          .login-right { padding: 25px 18px; }
          .login-form h2 { font-size: 27px; }
          .login-options { font-size: 11px; }
        }
      `}</style>

      <section className="login-left">
        <div className="login-brand">
          <span>C</span> ConnectHub
        </div>

        <div>
          <h1>Connect.<br />Collaborate.<br />Grow Together.</h1>
          <p>
            Bring your team together in one place.
            Manage work, share ideas and stay connected
            with your organization.
          </p>

          <div className="login-features">
            ✓ Simple team collaboration<br />
            ✓ Organized workspace<br />
            ✓ Stay connected anywhere
          </div>
        </div>

        <div className="login-footer">
          © 2026 ConnectHub. All rights reserved.
        </div>
      </section>

      <section className="login-right">
        <div className="login-form">
          <div className="login-mobile-brand">🔵 ConnectHub</div>

          <h2>Welcome back!</h2>
          <p className="login-subtitle">
            Enter your details to access your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-password">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => setMessage(
                  'Password recovery will be available after backend integration.'
                )}
              >
                Forgot password?
              </button>
            </div>

            <button className="login-submit" type="submit">
              Sign In →
            </button>

            {message && (
              <div className="login-message" role="status">
                {message}
              </div>
            )}
          </form>

          <div className="login-security">
            Secure workspace · ConnectHub
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login



