import React from 'react';

import styled from 'styled-components';

const Header = () => {
  return (
    <MainHeader>
        <div className='header'>
        <div className='fun-text'> Comicon</div>
        <div className='fun-text-subtitle'>Create and Share Your Own Comics!</div>
        </div>
  
    </MainHeader>
  )
};

const MainHeader = styled.header`
.header {
  padding: 0 3rem;
  height: 8rem;
  background-color: #ff4e00;
  display: flex;
  align-items: center;
  text-align: center;
}

.fun-text{
    align-items:center;
    font-family: 'Comic Sans MS', cursive; /* Use a comic-style font */
    font-size: 3rem;
    margin: 0;
    color: #fff;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.8);
}
.fun-text-subtitle{
    font-size: 1rem;
    color: #fff;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.8);
    margin: 0;
    margin-top: 1rem; /* Adjust the margin-top to provide spacing */
    font-family: 'Comic Sans MS', cursive; 
    margin-left: 2rem;
  


}




`;

export default Header