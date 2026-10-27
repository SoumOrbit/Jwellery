import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Diamond, Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminLoginPage = () => {
  const { login, isAdminLoggedIn } = useAdmin();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login(email, password);
      setIsLoading(false);
      if (res && res.success) {
        navigate('/admin');
      } else {
        setError(res?.message || 'Invalid credentials');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred during authentication.');
    }
  };

  const handleFillCredentials = () => {
    setEmail('admin@lumiere.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-emblem">
              <Diamond size={32} className="text-gold" />
            </div>
            <span className="admin-sub">Atelier Portal Access</span>
            <h1 className="admin-title">LUMIÈRE Haute Joaillerie</h1>
            <p className="admin-desc">
              Restricted management console for atelier directors, inventory management, client acquisitions, and private appointments.
            </p>
          </div>

          {/* Quick Credential Box */}
          <div className="credential-hint-box">
            <div className="hint-header">
              <KeyRound size={16} className="text-gold" />
              <strong>Official Admin Credentials</strong>
            </div>
            <div className="hint-details">
              <div>Email: <code>admin@lumiere.com</code></div>
              <div>Password: <code>admin123</code></div>
            </div>
            <button 
              type="button" 
              onClick={handleFillCredentials}
              className="autofill-btn"
            >
              <Sparkles size={14} /> <span>Autofill Credentials</span>
            </button>
          </div>

          {error && <div className="admin-error-box">{error}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-field">
              <label>Administrator Email</label>
              <div className="admin-input-wrap">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="admin@lumiere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Master Password</label>
              <div className="admin-input-wrap">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full admin-submit-btn">
              {isLoading ? (
                <span>Authenticating Atelier Token...</span>
              ) : (
                <>
                  <span>Enter Admin Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="admin-footer-security">
            <ShieldCheck size={16} className="text-gold" />
            <span>256-Bit Encrypted Session &bull; Authorized Personnel Only</span>
          </div>

          <div className="text-center mt-3">
            <Link to="/" className="back-storefront-link">
              &larr; Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
