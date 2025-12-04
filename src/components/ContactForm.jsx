import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // bot trap
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ 
          type: 'success', 
          message: '✅ ' + data.message 
        });
        // Reset form
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setStatus({ 
          type: 'error', 
          message: '❌ ' + (data.error || 'დაფიქსირდა შეცდომა') 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: '❌ ქსელის შეცდომა. გთხოვთ შეამოწმოთ ინტერნეტ კავშირი' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📧 დაგვიკავშირდით</h2>
        <p style={styles.subtitle}>
          შეავსეთ ფორმა და ჩვენ დაგიკავშირდებით უმოკლეს დროში
        </p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Honeypot - hidden field for bots */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
            style={{ display: 'none' }}
            aria-hidden="true"
          />

          {/* Name Field */}
          <div style={styles.fieldGroup}>
            <label htmlFor="name" style={styles.label}>
              სახელი <span style={styles.required}>*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength="100"
              placeholder="თქვენი სახელი"
              style={styles.input}
            />
          </div>

          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>
              Email <span style={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              style={styles.input}
            />
          </div>

          {/* Message Field */}
          <div style={styles.fieldGroup}>
            <label htmlFor="message" style={styles.label}>
              მესიჯი <span style={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength="10"
              maxLength="2000"
              rows="6"
              placeholder="დაწერეთ თქვენი შეტყობინება... (მინიმუმ 10 სიმბოლო)"
              style={{...styles.input, ...styles.textarea}}
            />
            <div style={styles.charCount}>
              {formData.message.length} / 2000 სიმბოლო
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}>⏳</span> იგზავნება...
              </>
            ) : (
              <>📤 გაგზავნა</>
            )}
          </button>

          {/* Status Message */}
          {status.message && (
            <div style={{
              ...styles.statusMessage,
              ...(status.type === 'success' ? styles.statusSuccess : styles.statusError)
            }}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// ============================================
// STYLES
// ============================================

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '28px',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 30px 0',
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  required: {
    color: '#e74c3c',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    transition: 'border-color 0.3s',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '120px',
  },
  charCount: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'right',
  },
  button: {
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    marginTop: '10px',
  },
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
  },
  statusMessage: {
    padding: '15px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '500',
  },
  statusSuccess: {
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  statusError: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  }
};

export default ContactForm;