import React from 'react';
import Header from '../components/Header';
import Frame from '../components/FrameHome';
import Footer from '../components/Footer';

function Index( { data}) {
  return (
    <div className="App">
      <Header searchBar={true}/>
      <Frame data = {data} title = {"Recommended"}/>
      <Footer/>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/api/getItems`);
  const data = await res.json();
  return { props: { data } };

}

export default Index;
