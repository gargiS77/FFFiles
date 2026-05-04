import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(val => {
        setData(val);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading posts...</h2>;
  }

  // Pagination logic
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentPosts = data.slice(start, end);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts Viewer</h2>

      {selected ? (
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
          <button onClick={() => setSelected(null)}>Back to list</button>
        </div>
      ) : (
        <div>
          {currentPosts.map(post => (
            <div key={post.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
              <h4>{post.title}</h4>
              <p>{post.body.substring(0, 50)}...</p>
              <button onClick={() => setSelected(post)}>Read More</button>
            </div>
          ))}

          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
          <span style={{ margin: "0 10px" }}>Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={end >= data.length}>Next</button>
        </div>
      )}
    </div>
  );
}
export default App;
