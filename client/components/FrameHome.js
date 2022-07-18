import React, { useEffect, useState } from "react";
import Item from './Item';
import { Box, Grid, Select, MenuItem, FormControl, InputLabel, Typography, Slider, Divider } from '@mui/material';
import { ItemSkeleton } from './SkeletonTemplate.js';


export default function Frame(props) {

    const [products, fetchProducts] = useState([])
    const [shownProducts, setShownProducts] = useState([])
    const [minPrice, setMinPrice] = useState(9999999)
    const [maxPrice, setMaxPrice] = useState(0)
    const [brand, setBrand] = useState('All')
    const [brands, setBrands] = useState([])
    const [sort, setSort] = useState("default")
    const [sliderValue, setSliderValue] = useState([0, 0]);

    const marks = [{ value: minPrice, label: `${minPrice} Ft` }, { value: maxPrice, label: `${maxPrice} Ft` }]

    const minDistance = 1000;

    const handleSliderChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setSliderValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setSliderValue([clamped - minDistance, clamped]);
            }
        } else {
            setSliderValue(newValue);
        }
        let temp = products.filter(product => product.price >= sliderValue[0] && product.price <= sliderValue[1])
        temp = temp.filter(product => product.brand === brand || brand === 'All')
        setShownProducts(temp)

    };

    const handleChange = (event) => {
        setSort(event.target.value)
        sortBy(event.target.value)
    }

    const sortBy = (sortBy) => {
        let sortedProducts = shownProducts.sort((a, b) => {
            if (sortBy === "priceASC") {
                return a.price - b.price
            } else if (sortBy === "name") {
                return a.name.localeCompare(b.name)
            } else if (sortBy === "category") {
                return a.category.localeCompare(b.category)
            } else if (sortBy === "rating") {
                return a.rating.rate - b.rating.rate
            } else if (sortBy === "default") {
                return a.name.localeCompare(b.name)
            } else if (sortBy === "priceDESC") {
                return b.price - a.price
            }
        }
        )
        setShownProducts(sortedProducts)
    }

    useEffect(() => {
        let temp = [];
        products.forEach(product => {
            if (product.brand === brand) {
                temp.push(product)
            }
            else if (brand === "All") {
                temp.push(product)
            }
        })
        temp = temp.filter(product => product.price >= sliderValue[0] && product.price <= sliderValue[1])
        setShownProducts(temp)

    }, [brand])

    useEffect(() => {
        if (props.data) {
            fetchProducts(props.data)
            let min = 999999;
            let max = 0;
            props.data.map(product => {
                if (product.price > max) {
                    max = product.price
                }
                if (product.price < min) {
                    min = product.price
                }
            })
            setMaxPrice(max)
            setMinPrice(min)
            setSliderValue([min, max])
            setShownProducts(props.data)
            let temp = [];
            props.data.map(product => {
                if (!temp.includes(product.brand)) {
                    temp.push(product.brand)
                }
            })
            setBrands([...new Set(temp)])
        }
    }, [props.data])

    return (
        <div>
            <Box mt={2}>
                <Grid container>
                    <Grid item bgcolor={"grey.100"} sm={3} sx={{ pt: 2, borderRadius: "10px" }}>
                        <Box p={1}>


                            <FormControl fullWidth>
                                <InputLabel id="sortSelect-helper-label">Sort by</InputLabel>

                                <Select
                                    labelId="sortSelect"
                                    id="sortSelect"
                                    value={sort}
                                    defaultValue="default"
                                    size="small"
                                    label="Sort by"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="default">Default</MenuItem>
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="category">Category</MenuItem>
                                    <MenuItem value="priceASC">Price (ASC)</MenuItem>
                                    <MenuItem value="priceDESC">Price (DESC)</MenuItem>
                                    <MenuItem value="rating">Rating</MenuItem>
                                </Select>
                            </FormControl>

                        </Box>
                        <Box mx={1} px={5} >
                            <Typography id="priceRange" gutterBottom variant="h6">
                                Price Range
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={sliderValue}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                disableSwap
                                min={products.length > 0 ? minPrice : null}
                                max={products.length > 0 ? maxPrice : null}
                                defaultValue={products.length > 0 ? [minPrice, maxPrice] : null}
                                step={1000}
                                marks={products.length > 0 ? marks : null}
                            />

                        </Box>
                        <Divider />
                        <Box m={2} mx={1} >
                            <Typography id="priceRange" gutterBottom variant="h6">
                                Brands
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="brandSelect-label">Brands</InputLabel>
                                <Select
                                    id="brandSelect"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    label="Brands"
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    {brands.map((brand) => (
                                        <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Divider />
                    </Grid>
                    <Grid item sm={9}>
                        <Box mx={1}>
                            <Box mx={1} sx={{ bgcolor: 'grey.100', borderWidth: "2px", color: "secondary.main", borderRadius: "15px" }}>
                                <Box p={2} textAlign="start">
                                    <Typography color="secondary" textAlign="left" variant="h4">
                                        <b>{props.title}</b>
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        <b>{shownProducts.length} {shownProducts.length === 1 ? "item" : "items"}</b>
                                    </Typography>
                                </Box>
                                <Box p={0} sx={{ bgcolor: 'grey.100' }}>
                                    <Grid container spacing={1} minHeight="700px">
                                        {shownProducts.length > 0 ? (
                                            shownProducts.map(product => {
                                                return (
                                                    <Grid sx={{ p: 0 }} key={product._id} item xl={3} >
                                                        <Item slug={product.slug} category={product.category} ratings={product.ratings} attributes={product.attributes} id={product._id} image={product.image.data} title={product.name} currency="Ft" price={product.price} />
                                                    </Grid>
                                                )
                                            })
                                        ) : null
                                        }
                                        {products.length === 0 ?
                                            <Grid sx={{ m: 0.2 }} container spacing={1}>
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                                <ItemSkeleton />
                                            </Grid>

                                            :
                                            null}

                                    </Grid >
                                </Box>
                            </Box >
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>

    );
}