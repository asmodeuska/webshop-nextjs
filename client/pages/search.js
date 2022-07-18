import React, { } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Frame from "../components/FrameHome";

function Search(props) {
  return (
    <div className="App">
      <Header searchBar={true}/>
      <Frame data={ props.data } title={"Search"} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:5000/api/search/${context.query.q}`);
  const data = await res.json();
  return { props: { data } };

}


export default Search;