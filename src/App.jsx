import { useState, useEffect } from "react";
import NewsBoard from "./Components/NewsBoard";
import NavBar from './Components/Navbar';
import PrivacyModal from './Components/privacymodal';

const App = () => {
  const [bookmarks, setBookmarks] = useState([]); // State for bookmarks
  const [showPrivacy, setShowPrivacy] = useState(true); // State to show privacy modal
  const [category, setCategory] = useState('general'); // Default category

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles'));
    if (storedBookmarks) {
      setBookmarks(storedBookmarks);
    }
  }, []); // Load bookmarks from local storage on mount

  const toggleBookmark = (article) => {
    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((item) => item.url === article.url);
      let updatedBookmarks;

      if (isBookmarked) {
        // Remove from bookmarks
        updatedBookmarks = prevBookmarks.filter((item) => item.url !== article.url);
      } else {
        // Add to bookmarks
        updatedBookmarks = [...prevBookmarks, article];
      }

      // Save to local storage
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const acceptPrivacy = () => {
    setShowPrivacy(false);
  };

  return (
    <>
      <NavBar setCategory={setCategory} /> {/* Pass setCategory to NavBar */}
      <NewsBoard toggleBookmark={toggleBookmark} bookmarks={bookmarks} category={category} />
      <PrivacyModal show={showPrivacy} onAccept={acceptPrivacy} />
    </>
  );
};

export default App;
