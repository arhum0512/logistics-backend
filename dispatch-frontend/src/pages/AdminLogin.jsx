import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Shield, Lock, Mail, Moon, Sun } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isDarkMode = localStorage.getItem('theme') === 'dark';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await API.post('/auth/login', { email, password });
            
            // SECURITY CHECK: Kick them out if they are not an Admin!
            if (response.data.user.role !== 'admin') {
                setError("Access Denied: Admin privileges required.");
                return; 
            }

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const theme = isDarkMode ? {
        bg: '#0f172a', card: '#1e293b', text: '#f8fafc', textMuted: '#94a3b8', border: '#334155'
    } : {
        bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', textMuted: '#64748b', border: '#cbd5e1'
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.bg }}>
            <div style={{ background: theme.card, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <Shield size={48} color="#ef4444" style={{ margin: '0 auto 20px auto' }} />
                <h2 style={{ color: theme.text, margin: '0 0 10px 0' }}>Command Center</h2>
                <p style={{ color: theme.textMuted, marginBottom: '30px' }}>LogisticsPro Admin Portal</p>
                
                {error && <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '12px' }}>
                        <Mail color={theme.textMuted} size={20} style={{ marginRight: '10px' }} />
                        <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ border: 'none', background: 'transparent', color: theme.text, width: '100%', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '12px' }}>
                        <Lock color={theme.textMuted} size={20} style={{ marginRight: '10px' }} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ border: 'none', background: 'transparent', color: theme.text, width: '100%', outline: 'none' }} />
                    </div>
                    <button type="submit" style={{ padding: '14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Admin Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;