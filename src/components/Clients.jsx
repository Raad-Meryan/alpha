import React from 'react';
import './Clients.css';

// Import client images

import client1 from '../assets/Clients/1.png';
import client2 from '../assets/Clients/2.png';
import client3 from '../assets/Clients/3.png';
import client4 from '../assets/Clients/4.png';
import client5 from '../assets/Clients/5.png';
import client6 from '../assets/Clients/6.png';
import client7 from '../assets/Clients/7.png';
import client8 from '../assets/Clients/8.png';
import client9 from '../assets/Clients/9.png';
import client10 from '../assets/Clients/10.png';
import client12 from '../assets/Clients/12.png';
import client13 from '../assets/Clients/13.png';
import client14 from '../assets/Clients/14.png';
import client15 from '../assets/Clients/15.png';
import client16 from '../assets/Clients/16.png';
import client17 from '../assets/Clients/17.png';
import client19 from '../assets/Clients/19.png';
import client20 from '../assets/Clients/20.png';

const Clients = ({ page = 1 }) => {
  const allClientImages = [
    client8, client2, client9, client16, client3, client19, client10, client15,
    client7, client5, client17, client13, client4, client6, client12, client20
  ];

  // Determine which images to render based on page
  const images = page === 1 ? allClientImages.slice(0, 8) : allClientImages.slice(8);
 
  return (
    <div className={`clients ${page === 2 ? 'clients--center' : ''}`}>
      <div className="clients-container">
        {page === 1 && (
          <p className="clients-description">
            Every client's story inspires us<br />
            <strong>Join them</strong> and make your vision unforgettable
          </p>
        )}

        <div className="clients-grid">
          {images.map((clientImage, index) => (
            <div key={index + (page === 1 ? 0 : 6)} className="client-item">
              <div className="client-logo">
                <img 
                  src={clientImage} 
                  alt={`Client ${index + 1 + (page === 1 ? 0 : 6)}`}
                  className="client-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
