import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCards/postcardquestion";
import TopQuestionsHeader from "../components/PostCards/TopQuestionHeader";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      {isLoggedIn && <TopQuestionsHeader />}
      <PostCard />
    </>
  );
}

export default Home;
