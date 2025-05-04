
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './HomePage.css'; // Assuming you will style it in a separate CSS file.

// const HomePage = () => {
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is logged in
//     if (localStorage.getItem('token')) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }

//     // Fetch skills from the backend (Make sure you have the appropriate API for skills)
//     axios
//       .get('http://localhost:5000/api/skills')  // Ensure this endpoint exists on your backend
//       .then((response) => {
//         setSkills(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching skills:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleLogout = () => {
//     // Remove token from localStorage and update state
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     navigate('/'); // Redirect to home page after logout
//   };

//   return (
//     <div className="home-page">
//       <header>
//         {/* Top Right: Sign In or Log Out */}
//         <div className="auth-links">
//           {isAuthenticated ? (
//             <button onClick={handleLogout} className="btn">
//               Logout
//             </button>
//           ) : (
//             <Link to="/login" className="btn">
//               Sign In
//             </Link>
//           )}
//         </div>
//       </header>

//       <h1>Welcome to SkillSync</h1>
//       <p>Your peer-to-peer teaching barter system, connect with others to teach and learn!</p>

//       {/* "Connect with Us" Section */}
//       <div className="connect-section">
//         <h2>Connect With Us</h2>
//         <p>Find people to teach and learn skills from. It's simple to get started!</p>
//         <center>
//           <Link to="/register" className="btn">Register to Teach</Link>
//         </center>
//       </div>

//       <div className="skill-list">
//         {loading ? (
//           <p>Loading skills...</p>
//         ) : (
//           <>
//             {skills.length === 0 ? (
//               <p>No skills available. Start by registering your skills!</p>
//             ) : (
//               <div>
//                 <h2>Available Skills</h2>
//                 <ul>
//                   {skills.map((skill) => (
//                     <li key={skill._id} className="skill-item">
//                       <h3>{skill.name}</h3>
//                       <p>{skill.description}</p>
//                       <Link to={`/skills/${skill._id}`} className="btn">
//                         View Details
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <div className="register-section">
//         <p>Want to teach a skill? <center><Link to="/register" className="btn">Register your skill</Link></center></p>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Assuming you will style it in a separate CSS file.

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Fetch skills from the backend
    axios
      .get('http://localhost:5000/api/skills') // Ensure this endpoint exists on your backend
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="home-page">
      <header>
        {/* Top Right: Sign In or Log Out */}
        <div className="auth-links">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn">
              Sign In
            </Link>
          )}
        </div>
      </header>

      <h1>Welcome to SkillSync</h1>
      <p>Your peer-to-peer teaching barter system, connect with others to teach and learn!</p>

      {/* "Connect with Us" Section */}
      <div className="connect-section">
        <h2>Connect With Us</h2>
        <p>Find people to teach and learn skills from. It's simple to get started!</p>
        <center>
          <Link to="/register" className="btn">Register to Teach</Link>
        </center>
      </div>

      <div className="skill-list">
        {loading ? (
          <p>Loading skills...</p>
        ) : (
          <>
            {skills.length === 0 ? (
              <p>No skills available. Start by registering your skills!</p>
            ) : (
              <div>
                <h2>Available Skills</h2>
                <ul>
                  {skills.map((skill) => (
                    <li key={skill._id} className="skill-item">
                      <h3>{skill.name}</h3>
                      <p>{skill.description}</p>
                      <Link to={`/skills/${skill._id}`} className="btn">
                        View Details
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="register-section">
        <p>Want to teach a skill? <center><Link to="/register" className="btn">Register your skill</Link></center></p>
      </div>
    </div>
  );
};

export default HomePage;
