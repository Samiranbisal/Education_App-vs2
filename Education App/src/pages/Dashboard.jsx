import React from 'react'
import { Link } from "react-router-dom";
import ImageSlider from '../components/ImageSlider';
import Couse from '../components/Couse';
import Fitness from './Fitness';
import TVShows from './TVShows';
import YouTubePage from './ YouTubePage';
import AutoTypingMessage from './AutoTypingMessage';
import ChatPage from './ChatPage';
import QuestionPage from './QuestionPage';
import SocialMediaPage from './SocialMediaPage';
import AudienceJoin from '../components/AudienceJoin';
import CohostJoin from '../components/CohostJoin';
import GroupInvitePage from './GroupInvitePage';


const Dashboard = () => {
  return (
    <>
    {/* <div>Dashboard Login</div> */}
        {/* <Main/> */}
        {/* <button>
        <Link to="/logout">Logout</Link>
        </button> */}
        {/* <br/> */}
        <br/>
        <ImageSlider/>
        <br/>
        <Couse/>
        {/* <br/> */}
        {/* <Fitness/> */}
        <AutoTypingMessage />
        <br/>
        <TVShows/>
        <br/>
        <YouTubePage/>
        <br/>
        {/* <SocialMediaPage/> */}
        {/* <AudienceJoin/> */}
        <br/>
        {/* <CohostJoin/> */}
        <br/>
        {/* <GroupInvitePage/> */}
    </>
  )
}

export default Dashboard


