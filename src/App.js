import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Optional: for styling
import ItemForm from './ItemForm';
import SignupForm from './SignupForm';

const App = () => {
  const sections = [
    {
      title: "Section 1",
      image: "https://picsum.photos/800/400?random=1", // Image to display
      backgroundImage: "https://picsum.photos/800/600?random=1", // Background image
      description: "Description for Section 1"
    },
    {
      title: "Section 2",
      image: "https://picsum.photos/800/400?random=2",
      backgroundImage: "https://picsum.photos/800/600?random=2",
      description: "Description for Section 2"
    },
    {
      title: "Section 3",
      image: "https://picsum.photos/800/400?random=3",
      backgroundImage: "https://picsum.photos/800/600?random=3",
      description: "Description for Section 3"
    },
    {
      title: "Section 4",
      image: "https://picsum.photos/800/400?random=4",
      backgroundImage: "https://picsum.photos/800/600?random=4",
      description: "Description for Section 4"
    },
    {
      title: "Section 5",
      image: "https://picsum.photos/800/400?random=5",
      backgroundImage: "https://picsum.photos/800/600?random=5",
      description: "Description for Section 5"
    },
  ];

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              {sections.map((section, index) => (
                <li key={index}><Link to={`/${section.title.toLowerCase().replace(' ', '-')}`}>{section.title}</Link></li>
              ))}
              <li>
                <Link to="/item-form">Show Form</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              sections.map((section, index) => (
                <section
                  key={index}
                  id={`section${index + 1}`}
                  style={{
                    backgroundImage: `url(${section.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '40px',
                    margin: '20px 0',
                    borderRadius: '8px'
                  }}
                >
                  <h2>{section.title}</h2>
                  <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>Here is some additional content that introduces the section.</p>
                  <img src={section.image} alt={section.title} style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }} />
                  <p style={{ marginTop: '20px', fontSize: '1.2em' }}>{section.description}</p>
                  <p style={{ marginTop: '10px', fontSize: '1.2em' }}>Feel free to explore more about this section!</p>
                </section>
              ))
            } />
            <Route path="/item-form" element={<ItemForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} Simple Page. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
