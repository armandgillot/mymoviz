import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Container,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  Popover,
  popoverOpen,
  toggle,
  PopoverHeader,
  PopoverBody,
  ListGroupItem,
  ListGroup
} from 'reactstrap';

import Movie from './components/Movie'

function App() {

  // const [moviesCount, setMovieCount] = useState(0)
  const [moviesWishList, setMoviesWishList] = useState([])
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    async function majNewMovies() {
      const newMoviesFromRoute = await fetch(`/new-movie`);
      const jsonNewMoviesFromRoute = await newMoviesFromRoute.json();
      setMoviesList(jsonNewMoviesFromRoute.result)
    }
    async function majWhishListDb() {
      const newWhishlistFromDb = await fetch(`/wishlist-movie`);
      const jsonNewWhishlistFromDb = await newWhishlistFromDb.json();
      setMoviesWishList(jsonNewWhishlistFromDb.wishlist)
    }

    majNewMovies()
    majWhishListDb()

  },
    []);

  // AJOUTER FILM
  var handleClickAddMovie = (movie, img) => {

    setMoviesWishList([...moviesWishList, { name: movie, image: img }]);

    async function addWishlist() {
      await fetch('/wishlist-movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${movie}&imageUrl=${img}`
      });
    }
    addWishlist()
  }

  // SUPPRIMER FILM
  var handleClickDeleteMovie = (movie) => {

    setMoviesWishList(moviesWishList.filter((object => object.name !== movie)));

    async function deleteWishlist() {
      await fetch(`/wishlist-movie/${movie}`, {
        method: 'DELETE'
      });
    }
    deleteWishlist()
  }

  var movieListPopover = moviesWishList.map((movie, i) => {
    return (<ListGroupItem key={i}><img src={movie.image} width="25%" /><br />{movie.name}</ListGroupItem>)
  })

  var movieList = moviesList.map((movie, i) => {

    var position = moviesWishList[moviesWishList.findIndex(i => i.name === movie.title)];

    return (
      <Movie
        key={i}
        movieName={movie.title}
        movieDesc={movie.overview.slice(0, 80) + '...'}
        movieImg={movie.backdrop_path ? "https://image.tmdb.org/t/p/w500" + movie.backdrop_path : '/generique.jpg'}
        globalRating={movie.vote_average}
        globalCountRating={movie.vote_count}
        handleClickAddMovie={handleClickAddMovie}
        handleClickDeleteMovie={handleClickDeleteMovie}
        toSee={position ? true : false}
      />)
  })
  const toggle = () => setPopoverOpen(!popoverOpen);

  return (

    <div style={{ backgroundColor: "#232528" }}>
      <Container>

        <Nav className="align-items-center">
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{ color: 'white' }}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>

              <Button id="Popover1" type="button">
                {moviesWishList.length} films
                </Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>WishList</PopoverHeader>
                <ListGroup>
                  {movieListPopover}
                </ListGroup>
              </Popover>

            </NavLink>
          </NavItem>
        </Nav>
        <Row>
          {movieList}
        </Row>

      </Container>
    </div>
  );
}

export default App;
