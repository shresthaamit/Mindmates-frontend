import ProfileHeader from "../components/Profile/ProfileHeader";
// import AboutSection from "../components/Profile/AboutSection";

import BadgesSection from "../components/Profile/BadgeSection";
import TabsNavigation from "../components/Profile/TabsNavigation";
import RecentActivity from "../components/Profile/RecentActivity";
import "./AllCSS/profile.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="main-content">
        <div className="sidebar">
          {/* <AboutSection /> */}

          <BadgesSection />
        </div>
        <div className="content">
          <TabsNavigation />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
