
import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
const API_URL = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';
const Wrapper = styled.section`
  padding: 2rem;
  background-image : url('https://i.pinimg.com/originals/4f/bc/09/4fbc0927c202490662c2c9e3d976f4c9.jpg') ;  // Replace 'your-background-image.jpg' with the actual file path or URL of your background image
  background-color: rgba(255,255,255,0.1);
  background-blend-mode: lighten;
  background-size: contain;
  background-position: center;


  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .panel-card {
    font-family: 'Comic Sans MS', cursive;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    border: 0.2rem solid ${({ theme }) => theme.colors.primary};
  
    &::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      bottom: 0.5rem;
      left: 0.5rem;
      border: 0.2rem dashed ${({ theme }) => theme.colors.primary};
      z-index: -1;
    }
  
    textarea {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 1rem;
      border: none;
      outline: none;
      background: none;
      resize: none;
      font-size: 1rem;
      font-family: 'Comic Sans MS', cursive; /* Use a comic-style font */
      color: ${({ theme }) => theme.colors.text};
    }
  
    img {
      max-width: 100%;
      height: auto;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
  

  .generate-button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    font-family: 'Comic Sans MS', cursive;
    font-size: 1.5rem;
    background: linear-gradient(to right, #ff9d00, #ff4e00); /* Gradient background */
    color: #fff;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  
    &:hover {
      transform: scale(1.1); /* Enlarge on hover */
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); /* White shadow for 3D effect */
    }
  
    &::before {
      
       /* Replace 'cartoon-icon.png' with your cartoon icon image */
      width: 40px; /* Adjust the size as needed */
      height: 40px;
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  
    &::after {
     
  
      font-size: 1rem;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  
    &:hover::after {
      opacity: 1;
    }
  
    &:focus {
      outline: none;
    }
  }
  @media only screen and (max-width: 768px) {
    .grid {
    
      grid-template-columns: repeat(1, 1fr); 
      gap: 1rem; 
    }

  }

  
`;

const Comic = () => {
  const [panels, setPanels] = useState(Array.from({ length: 10 }, () => ''));
  const [comicImages, setComicImages] = useState(Array.from({ length: 10 }, () => null));
  const printRef = useRef(null);
  // Function to generate comic images
  const generateComic = async () => {
    console.log('clicked');
    try {
      const images = await Promise.all(
        panels.map(async (text, index) => {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Accept': 'image/png',
              'Authorization': 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: text }),
          });
          console.log(response)
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      setComicImages(images);
    } catch (error) {
      console.error('Error generating comic:', error);
    }
  };
  const clearAll = () => {
    setPanels(Array.from({ length: 10 }, () => ''));
    setComicImages(Array.from({ length:10},()=>''));
  };
  const printComics = () => {
    const pdf = new jsPDF();
  
  
    const totalHeight = panels.length * 50;
  
    panels.forEach((panel, index) => {
      const image = new Image();
      image.src = comicImages[index];
  
     
      pdf.addImage(image, 'JPEG', 10,  50, 180, 200);
  
 
      if (index < panels.length - 1) {
        pdf.addPage();
      }
    });
  
    pdf.save('comic.pdf');
  };

 
  return (
    <Wrapper>
      <div className="grid">
        {panels.map((panel, index) => (
          <div key={index} className="panel-card">
            <label htmlFor={`panel${index + 1}`}>{`Scene ${index + 1}:`}</label>
            <textarea
              id={`panel${index + 1}`}
              name={`panel${index + 1}`}
              rows="4"
              value={panel}
              onChange={(e) => {
                const updatedPanels = [...panels];
                updatedPanels[index] = e.target.value;
                setPanels(updatedPanels);
              }}
            />

            {comicImages[index] && (
              
                <img src={comicImages[index]} alt={`Panel ${index + 1}`} />
              
            )}


          </div>
        ))}
      </div>
      <div className='grid'>
      <button className="generate-button" type="button" onClick={generateComic}>
        Generate Comic
      </button>
      <button className="generate-button" type="button" onClick={clearAll}>
        Clear All
      </button>
      <button className='generate-button' type='button' onClick={printComics}>Print Your Comic</button></div>
    </Wrapper>
  );
};

export default Comic;
