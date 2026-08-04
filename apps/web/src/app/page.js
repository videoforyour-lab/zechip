export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, #f0fdf4, #ffffff)',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', color: '#16a34a', marginBottom: '10px' }}>🍽️</h1>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#166534', marginBottom: '10px' }}>
        MenuBoxGh
      </h1>
      <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '500px', textAlign: 'center' }}>
        Digital menus, QR codes, and WhatsApp ordering for food vendors in Ghana
      </p>
      <a 
        href="/auth/signup"
        style={{
          marginTop: '30px',
          padding: '12px 32px',
          backgroundColor: '#22c55e',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Get Started - 180 GHS/month
      </a>
    </div>
  )
}
