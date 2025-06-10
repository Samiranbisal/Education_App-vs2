import React from 'react';
import './EventsPage.css';

const titles = [
    "React Workshop",
    "Tech Meetup",
    "Hackathon 2025",
    "JavaScript Conference",
    "AI & Machine Learning Summit",
    "Frontend Developer Bootcamp",
    "Cloud Computing Expo",
    "Startup Pitch Night",
    "Cybersecurity Seminar",
    "Mobile App Hackathon",
  ];
  
  const locations = [
    "Online",
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Remote",
    "Singapore",
  ];
  
  const descriptions = [
    "A hands-on workshop to learn React basics and advanced hooks.",
    "Connect with developers and startups in your area.",
    "Build amazing projects in 24 hours with a team.",
    "Deep dive into the latest JavaScript features and frameworks.",
    "Explore the future of AI and machine learning technologies.",
    "Intensive bootcamp to become a proficient frontend developer.",
    "Discover cloud computing trends and services.",
    "Pitch your startup ideas to investors and mentors.",
    "Learn about the latest threats and protection methods in cybersecurity.",
    "Collaborate on innovative mobile app projects in a hackathon setting.",
  ];
  
  const events = [];
  
  for (let i = 1; i <= 3; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
    // Dates between June 1 and July 30, 2025
    const startDate = new Date(2025, 5, 1).getTime(); // June 1, 2025
    const endDate = new Date(2025, 6, 30).getTime(); // July 30, 2025
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
  
    const formattedDate = randomDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    events.push({
      id: i,
      title,
      date: formattedDate,
      location,
      description,
    });
  }
  
  console.log(events);
  


const EventsPage = () => {
  return (
    <div className="events-container">
      <h1 className="events-title">Upcoming Events</h1>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p className="description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
