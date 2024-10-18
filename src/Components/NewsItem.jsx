const NewsItem = ({ title, description, src, url, toggleBookmark, isBookmarked }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      })
      .then(() => console.log('Article shared successfully!'))
      .catch((error) => console.error('Error sharing article:', error));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3"
      style={{ height: "450px", width: "340px" }} // Fixed dimensions for card
    >
      {/* Image styling */}
      <img
        src={src}
        style={{ height: "200px", width: "100%", objectFit: "cover" }} // Ensures image fits the card without distortion
        className="card-img-top"
        alt={title} // Use title for better accessibility
      />
      <div className="card-body">
        <h5 className="card-title">{title.length > 50 ? title.slice(0, 50) + '...' : title}</h5>
        <p className="card-text">{description ? description.slice(0, 90) : "News information is not uploaded"}</p>
        <a href={url} className="btn btn-primary">Read More</a>
        <button className="btn btn-secondary ms-2" onClick={() => toggleBookmark({ title, description, src, url })}>
          {isBookmarked ? 'Unbookmark' : 'Bookmark'}
        </button>
        <button className="btn btn-info ms-2" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
