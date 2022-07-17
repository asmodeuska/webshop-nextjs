import React from 'react';
import Header from '../components/Header';
import Frame from '../components/FrameHome';
import Footer from '../components/Footer';

function Index() {
  return (
    <div className="App">
      <Header searchBar={true} />
      <Frame/>
      <Footer/>
    </div>
  );
}

export default Index;
