import { useEffect, useState } from 'react';
import FrameSingle from '../../components/FrameSingle';
import Footer from '../../components/Footer';
import { Backdrop, CircularProgress } from '@mui/material';



export default function Product(props) {
  console.log(props)
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.data) {
      setLoading(false);
      setItem(props.data[0]);
    }
  }
    , [props.data])

  if (loading) {
    return <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  }
  else {
    return (
      <div className="App">
        <FrameSingle _id={item._id} category={item.category} ratings={item.ratings} description={item.description} attributes={item.attributes} image={item.image.data} title={item.name} currency="Ft" price={item.price} />
        <Footer />
      </div>
    );
  }

}

export async function getServerSideProps(context) {
  console.log(context.query)
  const res = await fetch(`http://localhost:5000/api/getItem/${context.query.slug}`);
  const data = await res.json();
  return { props: { data } };

}

