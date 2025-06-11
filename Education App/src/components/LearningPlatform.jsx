// import React from 'react';
// import LearningCard from './LearningCard';
// import '../styles/LearningPlatform.css';
// import { FaComments, FaUsers, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const LearningPlatform = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (title) => {
//     switch (title) {
//       case "One to one Chat":
//         navigate('/one-to-one-chat');
//         break;
//       case "Group Chat":
//         navigate('/live-streaming');
//         break;
//       case "Group Video Call":
//         navigate('/group-home-call');
//         break;
//       case "QuestionPage":
//         navigate('/question-page');
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="platform-container">
//       <div className="text-section">
//         <h2>Best platform<br />to learn<br />everything</h2>
//       </div>
//       <div className="arrow left"><FaChevronLeft /></div>

//       <div className="card-section">
//         <LearningCard
//           title="One to one Chat"
//           icon={<FaComments />}
//           bgColor="#3dbfd9"
//           onClick={() => handleCardClick("One to one Chat")}
//         />
//         <LearningCard
//           title="Live streaming"
//           icon={<FaUsers />}
//           bgColor="#a4d500"
//           onClick={() => handleCardClick("Group Chat")}
//         />
//         <LearningCard
//           title="Group Video Call"
//           icon={<FaVideo />}
//           bgColor="#f45b43"
//           onClick={() => handleCardClick("Group Video Call")}
//         />
//         <LearningCard
//           title="QuestionPage"
//           icon={<FaComments />}
//           bgColor="#f0c040"
//           onClick={() => handleCardClick("QuestionPage")}
//         />
//       </div>

//       <div className="arrow right"><FaChevronRight /></div>
//     </div>
//   );
// };

// export default LearningPlatform;

import React, { useRef } from 'react';
import LearningCard from './LearningCard';
import '../styles/LearningPlatform.css';
import {
  FaComments,
  FaUsers,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LearningPlatform = () => {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const handleCardClick = (title) => {
    switch (title) {
      case "One to one Chat":
        navigate('/one-to-one-chat');
        break;
      case "Group Chat":
        navigate('/live-streaming');
        break;
      case "Group Video Call":
        navigate('/group-home-call');
        break;
      case "QuestionPage":
        navigate('/question-page');
        break;
      default:
        break;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="platform-container">
      <div className="text-section">
        <h2>
          Best platform<br />
          to learn<br />
          everything
        </h2>
      </div>

      <div className="arrow left" onClick={() => scroll('left')}>
        <FaChevronLeft />
      </div>

      <div className="card-section" ref={scrollRef}>
        <LearningCard
          title="One to one Chat"
          icon={<FaComments />}
          bgColor="#3dbfd9"
          onClick={() => handleCardClick("One to one Chat")}
        />
        <LearningCard
          title="Live streaming"
          icon={<FaUsers />}
          bgColor="#a4d500"
          onClick={() => handleCardClick("Group Chat")}
        />
        <LearningCard
          title="Group Video Call"
          icon={<FaVideo />}
          bgColor="#f45b43"
          onClick={() => handleCardClick("Group Video Call")}
        />
        <LearningCard
          title="Query Page"
          icon={<FaComments />}
          bgColor="#f0c040"
          onClick={() => handleCardClick("QuestionPage")}
        />
        {/* Add more LearningCards if needed */}
      </div>

      <div className="arrow right" onClick={() => scroll('right')}>
        <FaChevronRight />
      </div>
    </div>
  );
};

export default LearningPlatform;
