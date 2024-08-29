// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#f9f9f9', padding: '20px 0', marginTop: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p style={{ textAlign: 'center', color: '#555', margin: 0 }}>
          &copy; 2024 DataCraft. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
