import React, { useState } from "react";

export default function App() {
  const images = [
    "https://picsum.photos/id/1018/300/200",
    "https://picsum.photos/id/1015/300/200",
    "https://picsum.photos/id/1019/300/200",
    "https://picsum.photos/id/1016/300/200"
  ];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Image Carousel</h2>
      <p>Image {index + 1} of {images.length}</p>
      <img src={images[index]} alt="carousel" />
      <br/><br/>
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  );
}
