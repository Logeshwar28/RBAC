import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='homepage'>
       <div className='hero'>
         <h2 className='section-title'>Get Started</h2>
         <p className='section-description'>
           Begin by managing your user roles and permissions with ease. Access-Hub gives you full control over who can access what within your system.
         </p>
         <div className='home-btn'><Link to="/signup" className='home-button'>Sign Up</Link></div>
         
       </div>

       <div className='about'>
         <h2 className='section-title'>Learn More</h2>
         <p className='section-description'>
           Explore the features of Access-Hub, understand how Role-Based Access Control (RBAC) works, and how it can streamline your business processes while keeping your data secure.
         </p>
       </div>

       <div className='features'>
         <h2 className='section-title'>Features</h2>
         <div className='feature-list'>
           <div className='feature-card'>
             <h3>Role Management</h3>
             <p>Create and manage roles for your users with ease.</p>
           </div>
           <div className='feature-card'>
             <h3>Permissions Control</h3>
             <p>Assign permissions to different roles for granular access.</p>
           </div>
           <div className='feature-card'>
             <h3>Secure & Scalable</h3>
             <p>Ensure robust security while scaling your operations.</p>
           </div>
         </div>
       </div>

</div>
  );
}

export default Home;
