import React from 'react';
import './Clients.css';

const Clients = () => {
  const clients = [
    { name: 'Client A', text: 'CLIENT A' },
    { name: 'Client B', text: 'CLIENT B' },
    { name: 'Client C', text: 'CLIENT C' },
    { name: 'Client D', text: 'CLIENT D' },
    { name: 'Client E', text: 'CLIENT E' },
    { name: 'Client F', text: 'CLIENT F' },
  ];

  return (
    <section id="clients" className="clients">
      <div className="container">
        <h2 className="section-title">Our Clients</h2>
        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={index} className="client-item">
              <div className="client-logo">
                <span className="client-name">{client.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
