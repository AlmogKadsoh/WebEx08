import React, { useState, useEffect } from 'react';
import './App.css'; // This is where you can put your CSS styles

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // This function fetches the images when the component mounts
    const fetchImages = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=15');
        const data = await response.json();
        const formattedData = data.map(item => ({
          thumbnail: `https://picsum.photos/100/100?image=${item.id}`,
          full: `https://picsum.photos/${item.width}/${item.height}?image=${item.id}`
        }));
        setImages(formattedData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []); // The empty array means this effect runs once after the initial render

  return (
    <div className="App">
      <h1>Image Browser</h1>

      <div className="thumbnail-container">
        {images.map(image => (
          <img
            key={image.thumbnail}
            src={image.thumbnail}
            className="thumbnail"
            alt="Thumbnail"
            onClick={() => setSelectedImage(image.full)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="selected-image-container">
          <h2>Selected Image</h2>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default App;
