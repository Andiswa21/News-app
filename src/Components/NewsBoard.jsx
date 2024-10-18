import { useState, useEffect, useRef } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ toggleBookmark, bookmarks }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const BASE_URL = 'https://newsapi.org/v2/everything?';

  function reload() {
    setLoading(true);
    setError(null);

    const inputText = inputRef.current ? inputRef.current.value : '';
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      console.error("API key is not available");
      setError("API key is not available");
      setLoading(false);
      return;
    }

    // Check if the input is empty
    if (!inputText) {
      alert("Please enter a search term.");
      setLoading(false);
      return;
    }

    const url = `${BASE_URL}q=${inputText}&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
        // Notify for breaking news
        if (data.articles.length) {
          notify("New articles available!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch articles");
        setLoading(false);
      });
  }

  useEffect(() => {
    // Optionally, we could fetch initial data if we had a default query
    // reload();
  }, []); // Removed category dependency

  // Function to show notifications
  const notify = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="d-flex" role="search">
        <input className="form-control me-2" ref={inputRef} type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" onClick={reload} type="submit">Search</button>
      </div>

      {/* Loading/Error/Articles */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && articles.length === 0 && <p>No articles found.</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {articles?.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
            toggleBookmark={toggleBookmark}
            isBookmarked={bookmarks.some((item) => item.url === news.url)} // Check if the article is bookmarked
          />
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;
