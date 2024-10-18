const NavBar = ({ setCategory }) => {
    const categories = [
      { label: "General", value: "general" },
      { label: "Business", value: "business" },
      { label: "Entertainment", value: "entertainment" },
      { label: "Health", value: "health" },
      { label: "Science", value: "science" },
      { label: "Sports", value: "sports" },
      { label: "Technology", value: "technology" },
      { label: "Bitcoin", value: "bitcoin" }, // Specific topic example
    ];
  
    return (
      <nav className="navbar bg-dark border-bottom border-body " data-bs-theme="dark">
        <div className="container-fluid">
          {/* App Title */}
          <div className="navbar-brand text-white">
            <span className="badge bg-light text-dark fs-4">News Codetribe</span>
          </div>
          
          {/* Categories */}
          <ul className="nav">
            {categories.map((category) => (
              <li className="nav-item" key={category.value}>
                <button
                  className="btn btn-link nav-link text-white"
                  onClick={() => setCategory(category.value)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  