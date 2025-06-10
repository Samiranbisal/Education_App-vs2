// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

const ACCESS_KEY = 'eLlZu6d2KefH8GPVf2b4M1vFBQNtWYq-U0TO5zXFXMU';

const blogsData = [
    {
      id: 1,
      title: "Why Learning Web Development Is a Great Career Move",
      date: "June 6, 2025",
      author: "Admin",
      excerpt:
        "Web development skills are in high demand. Discover why it’s a smart move to learn HTML, CSS, JavaScript, and React...",
      keyword: "technology coding",
    },
    {
      id: 2,
      title: "Top 10 Data Science Tools You Should Know",
      date: "June 3, 2025",
      author: "Data Team",
      excerpt:
        "From Jupyter to TensorFlow, explore the essential tools every data scientist should master...",
      keyword: "data science",
    },
    {
      id: 3,
      title: "Boost Your Career with Digital Marketing Skills",
      date: "May 29, 2025",
      author: "Marketing Pro",
      excerpt:
        "Digital marketing is more than just ads. Learn how SEO, content, and analytics fuel business growth...",
      keyword: "marketing digital",
    },
    {
      id: 4,
      title: "Mastering UI/UX Design for Better User Experience",
      date: "May 26, 2025",
      author: "Design Studio",
      excerpt:
        "Good design isn’t just pretty — it’s functional. Explore the fundamentals of UI/UX...",
      keyword: "ui ux design",
    },
    {
      id: 5,
      title: "Understanding Cloud Computing in 2025",
      date: "May 23, 2025",
      author: "Tech Cloud",
      excerpt:
        "Cloud computing is revolutionizing industries. Learn about AWS, Azure, and Google Cloud...",
      keyword: "cloud computing",
    },
    {
      id: 6,
      title: "How to Start a Career in Cybersecurity",
      date: "May 20, 2025",
      author: "Security Team",
      excerpt:
        "Cybersecurity professionals are in demand. Here's how to start your journey...",
      keyword: "cybersecurity",
    },
    {
      id: 7,
      title: "AI vs Machine Learning: What’s the Difference?",
      date: "May 17, 2025",
      author: "AI Expert",
      excerpt:
        "Artificial Intelligence and Machine Learning are not the same. Let’s break it down...",
      keyword: "ai machine learning",
    },
    {
      id: 8,
      title: "Learn Python: The Most Beginner-Friendly Language",
      date: "May 14, 2025",
      author: "Code Mentor",
      excerpt:
        "Python is a great first programming language. Find out why and how to start learning...",
      keyword: "python code",
    },
    {
      id: 9,
      title: "SEO Basics: How to Rank Your Website",
      date: "May 11, 2025",
      author: "SEO Geek",
      excerpt:
        "Search Engine Optimization is essential for online visibility. Learn the basics here...",
      keyword: "seo marketing",
    },
    {
      id: 10,
      title: "Freelancing in Tech: Tips to Succeed",
      date: "May 9, 2025",
      author: "Remote Pro",
      excerpt:
        "Want to be your own boss? Learn how to grow your freelance tech career...",
      keyword: "freelance work",
    },
    {
      id: 11,
      title: "Mobile App Development: iOS vs Android",
      date: "May 6, 2025",
      author: "App Devs",
      excerpt:
        "Which platform should you build for first? We compare iOS and Android development...",
      keyword: "mobile app",
    },
    {
      id: 12,
      title: "Building Your First Portfolio Website",
      date: "May 3, 2025",
      author: "Portfolio Coach",
      excerpt:
        "Your portfolio is your online resume. Here’s how to build a stunning one...",
      keyword: "portfolio website",
    },
    {
      id: 13,
      title: "Getting Started with Graphic Design",
      date: "April 30, 2025",
      author: "Visual Team",
      excerpt:
        "Learn the principles of visual communication and the tools used by graphic designers...",
      keyword: "graphic design",
    },
    {
      id: 14,
      title: "Introduction to Blockchain Technology",
      date: "April 27, 2025",
      author: "Crypto Writer",
      excerpt:
        "Blockchain is more than Bitcoin. Understand how this technology is reshaping industries...",
      keyword: "blockchain crypto",
    },
    {
      id: 15,
      title: "How to Learn React Quickly",
      date: "April 24, 2025",
      author: "React Mastery",
      excerpt:
        "React is a powerful JavaScript library. We share tips to speed up your learning...",
      keyword: "react js",
    },
    {
      id: 16,
      title: "Photography Tips for Beginners",
      date: "April 21, 2025",
      author: "PhotoSnap",
      excerpt:
        "Want to capture stunning photos? Start with these simple photography tips...",
      keyword: "photography",
    },
    {
      id: 17,
      title: "Top 5 Productivity Tools for Developers",
      date: "April 18, 2025",
      author: "DevTools Team",
      excerpt:
        "Boost your workflow with these essential tools every developer should use...",
      keyword: "developer productivity",
    },
    {
      id: 18,
      title: "Career Growth in the Tech Industry",
      date: "April 15, 2025",
      author: "HR Insights",
      excerpt:
        "Explore different career paths and how to advance in tech companies...",
      keyword: "career technology",
    },
    {
      id: 19,
      title: "Content Marketing Strategies for 2025",
      date: "April 12, 2025",
      author: "Content Guru",
      excerpt:
        "The content landscape is evolving. Learn what strategies work in 2025...",
      keyword: "content marketing",
    },
    {
      id: 20,
      title: "Designing for Accessibility",
      date: "April 9, 2025",
      author: "Inclusive Web",
      excerpt:
        "Web accessibility ensures equal access. Learn how to design for all users...",
      keyword: "web accessibility",
    },
    {
      id: 21,
      title: "Understanding Git and Version Control",
      date: "April 6, 2025",
      author: "GitHub Team",
      excerpt:
        "Version control is vital in coding. Understand Git, GitHub, and collaboration...",
      keyword: "git version control",
    },
    {
      id: 22,
      title: "Learn SQL: Manage Data Effectively",
      date: "April 3, 2025",
      author: "DB Expert",
      excerpt:
        "SQL lets you query databases with ease. Start learning this essential skill...",
      keyword: "sql database",
    },
    {
      id: 23,
      title: "The Rise of Remote Work in Tech",
      date: "April 1, 2025",
      author: "RemoteHub",
      excerpt:
        "Remote work is here to stay. Learn how to thrive in a distributed team...",
      keyword: "remote work",
    },
    {
      id: 24,
      title: "Getting Started with TypeScript",
      date: "March 29, 2025",
      author: "Typed Devs",
      excerpt:
        "TypeScript adds static typing to JavaScript. Here's how to start using it...",
      keyword: "typescript",
    },
    {
      id: 25,
      title: "Why Soft Skills Matter in Tech",
      date: "March 26, 2025",
      author: "Career Coach",
      excerpt:
        "Technical skills get your foot in the door, but soft skills help you grow...",
      keyword: "soft skills career",
    },
  ];  

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const updatedBlogs = await Promise.all(
          blogsData.map(async (blog) => {
            const query = encodeURIComponent(blog.keyword);
            const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${ACCESS_KEY}&orientation=landscape`;

            const response = await axios.get(url);

            // Extract image URL from API response
            const imageUrl = response.data.urls.small;

            return { ...blog, image: imageUrl };
          })
        );
        setBlogs(updatedBlogs);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
        // fallback to default images if error
        setBlogs(
          blogsData.map((blog) => ({
            ...blog,
            image: `https://source.unsplash.com/400x250/?${blog.keyword.replace(
              " ",
              ","
            )}`,
          }))
        );
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="blog-container">
      <h2 className="blog-title">Our Latest Blogs</h2>
      <div className="blog-grid">
        {blogs.length === 0 ? (
          <p>Loading blogs...</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p className="blog-meta">
                  By {blog.author} • {blog.date}
                </p>
                <p>{blog.excerpt}</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
