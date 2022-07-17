import { useEffect, useState } from 'react';
import FrameSingle from '../../components/FrameSingle';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { Backdrop, CircularProgress } from '@mui/material';

function Index() {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/getItem/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json())
        .then(data => {
          setProduct(data);
          console.log(data);
          setLoading(false);
        }
        )
    }
  }, [id]);



  if (id === undefined) {
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  }
  if (!loading) {
    return (
      <div className="App">
        <FrameSingle _id={product._id} category={product.category} ratings={product.ratings} description={product.description} attributes={product.attributes} image={product.image.data} title={product.name} currency="Ft" price={product.price} />
        <Footer />
      </div>
    );
  }
}

export default Index;
