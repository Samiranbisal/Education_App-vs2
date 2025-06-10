// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";

const courseKeywords = [
    { id: 1, title: "Web Development", keyword: "web development" },
    { id: 2, title: "Data Science", keyword: "data science" },
    { id: 3, title: "Digital Marketing", keyword: "digital marketing" },
    { id: 4, title: "Graphic Design", keyword: "graphic design" },
    { id: 5, title: "Mobile App Development", keyword: "mobile app development" },
    { id: 6, title: "Cybersecurity Fundamentals", keyword: "cybersecurity" },
    { id: 7, title: "Cloud Computing", keyword: "cloud computing" },
    { id: 8, title: "Machine Learning", keyword: "machine learning" },
    { id: 9, title: "Photography Basics", keyword: "photography" },
    { id: 10, title: "Video Editing", keyword: "video editing" },
    { id: 11, title: "Game Development", keyword: "game development" },
    { id: 12, title: "Artificial Intelligence", keyword: "artificial intelligence" },
    { id: 13, title: "Blockchain Technology", keyword: "blockchain" },
    { id: 14, title: "Ethical Hacking", keyword: "ethical hacking" },
    { id: 15, title: "Finance for Beginners", keyword: "finance" },
    { id: 16, title: "Stock Market Basics", keyword: "stock market" },
    { id: 17, title: "Python Programming", keyword: "python programming" },
    { id: 18, title: "Java Programming", keyword: "java programming" },
    { id: 19, title: "C++ for Beginners", keyword: "c++ programming" },
    { id: 20, title: "React for Beginners", keyword: "react js" },
    { id: 21, title: "Node.js API Development", keyword: "nodejs" },
    { id: 22, title: "DevOps Essentials", keyword: "devops" },
    { id: 23, title: "UI/UX Design", keyword: "ui ux design" },
    { id: 24, title: "Content Writing", keyword: "content writing" },
    { id: 25, title: "Public Speaking", keyword: "public speaking" },
    { id: 26, title: "Business Analytics", keyword: "business analytics" },
    { id: 27, title: "Entrepreneurship 101", keyword: "entrepreneurship" },
    { id: 28, title: "E-commerce Masterclass", keyword: "ecommerce" },
    { id: 29, title: "AI in Healthcare", keyword: "ai healthcare" },
    { id: 30, title: "Excel for Data Analysis", keyword: "excel data analysis" },
    { id: 31, title: "Photoshop for Beginners", keyword: "photoshop" },
    { id: 32, title: "Illustrator Design", keyword: "illustrator" },
    { id: 33, title: "Social Media Marketing", keyword: "social media marketing" },
    { id: 34, title: "Motion Graphics", keyword: "motion graphics" },
    { id: 35, title: "Product Management", keyword: "product management" },
    { id: 36, title: "SQL for Data", keyword: "sql database" },
    { id: 37, title: "WordPress Development", keyword: "wordpress development" },
    { id: 38, title: "Linux for Beginners", keyword: "linux" },
    { id: 39, title: "Augmented Reality Basics", keyword: "augmented reality" },
    { id: 40, title: "Time Management", keyword: "time management" },
    { id: 41, title: "Resume Building", keyword: "resume building" },
    { id: 42, title: "Interview Skills", keyword: "interview skills" },
    { id: 43, title: "Presentation Design", keyword: "presentation design" },
    { id: 44, title: "Creative Writing", keyword: "creative writing" },
    { id: 45, title: "Statistics for Data Science", keyword: "statistics data science" },
    { id: 46, title: "Customer Service Training", keyword: "customer service" },
    { id: 47, title: "Human Resource Management", keyword: "human resource" },
    { id: 48, title: "Interior Design", keyword: "interior design" },
    { id: 49, title: "Music Production", keyword: "music production" },
    { id: 50, title: "Language Learning", keyword: "language learning" },
    { id: 51, title: "3D Animation", keyword: "3d animation" },
    { id: 52, title: "Copywriting", keyword: "copywriting" },
    { id: 53, title: "Agile Project Management", keyword: "agile project management" },
    { id: 54, title: "Kubernetes Essentials", keyword: "kubernetes" },
    { id: 55, title: "Docker for Beginners", keyword: "docker" },
    { id: 56, title: "Firebase Crash Course", keyword: "firebase" },
    { id: 57, title: "Penetration Testing", keyword: "penetration testing" },
    { id: 58, title: "Salesforce Basics", keyword: "salesforce" },
    { id: 59, title: "Customer Relationship Management", keyword: "crm" },
    { id: 60, title: "Design Thinking", keyword: "design thinking" },
    { id: 61, title: "Augmented Reality with Unity", keyword: "unity ar" },
    { id: 62, title: "iOS App Development", keyword: "ios development" },
    { id: 63, title: "Android App Development", keyword: "android development" },
    { id: 64, title: "Big Data Fundamentals", keyword: "big data" },
    { id: 65, title: "NoSQL Databases", keyword: "nosql" },
    { id: 66, title: "Data Visualization", keyword: "data visualization" },
    { id: 67, title: "Email Marketing", keyword: "email marketing" },
    { id: 68, title: "YouTube Growth Strategies", keyword: "youtube marketing" },
    { id: 69, title: "Influencer Marketing", keyword: "influencer marketing" },
    { id: 70, title: "Figma for UI Design", keyword: "figma ui design" }
];

const ACCESS_KEY = 'fWz86cA_cMjmV8qroS4y6P_TMlOwBX_jcqcVvOVOzH4'; // Replace with your key

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const updatedCourses = await Promise.all(
        courseKeywords.map(async (course) => {
          try {
            const res = await axios.get(
              `https://api.unsplash.com/search/photos`,
              {
                params: { query: course.keyword, per_page: 1 },
                headers: {
                  Authorization: `Client-ID ${ACCESS_KEY}`,
                },
              }
            );

            const imageUrl = res.data.results[0]?.urls?.regular;

            return {
              ...course,
              image: imageUrl || "https://via.placeholder.com/400x250?text=No+Image",
              description: `Learn about ${course.keyword}.`,
            };
          } catch (error) {
            console.error(`Error fetching image for ${course.keyword}:`, error);
            return {
              ...course,
              image: "https://via.placeholder.com/400x250?text=Error",
              description: `Learn about ${course.keyword}.`,
            };
          }
        })
      );

      setCourses(updatedCourses);
    }

    fetchImages();
  }, []);

  return (
    <div className="courses-container">
      {/* <h2 className="courses-title">Our Courses</h2> */}
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
