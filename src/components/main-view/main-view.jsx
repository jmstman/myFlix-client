//main-view new

import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view/';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavView } from '../nav-view/nav-view';
import { FavoritesView } from '../favorites-view/favorites-view';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';


class MainView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: null
    };
    console.log('MainView Loaded')
  }

  componentDidMount () {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      console.log('componentDidMount MainView');
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn (authData) {
    this.props.setUser(authData);
    this.setState({
      user: authData.user
    });
    console.log('onLoggedIn reached', authData)
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getUser(token) {
    const user = localStorage.getItem("user")
    axios
      .get('https://paradiseflix.herokuapp.com/users/' + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data)
        this.setState({
          user: response.data
        });
        console.log('getUser response', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log('getUser reached')
  }


  getMovies (token) {
    axios.get('https://paradiseflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
        })
      .catch(function (error) {
        console.log(error);
      });
      console.log('getMovies reached');
  }

  onLoggedOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render () {
    let { movies } = this.props;
    let { user } = this.state;
    console.log('MainView Render user', user);
    console.log('MainView Render movies', movies);

    return (
      <Router>
        <div className="main-view justify-content-center">

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
            <Container>
              <Row>
                <Col className="p-0">
                  <NavView user={user} />
                </Col>
              </Row>
              <div className="d-flex flex-wrap justify-content-center">
                  <MoviesList movies={movies} />
              </div>
            </Container>
            );
          }} />

          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />;
            return <RegistrationView />
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Container>
                <Row>
                  <Col className="p-0">
                    <NavView user={user} />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col sm={12} md={10} lg={8}>
                    <MovieView 
                    movie={movies.find(m => m._id === match.params.movieId)} 
                    onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
            </Container>
            );
          }} />

          <Route path="/genres/:name" render={ ({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Container>
                <Row>
                  <Col className="p-0">
                    <NavView user={user} />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col md={10}>
                    <GenreView 
                    genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                    movies={movies}
                    onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
            </Container>
            );
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Container>
                <Row>
                  <Col className="p-0">
                    <NavView user={user}  />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col md={10}>
                    {/* find directors name from the database */}
                    <DirectorView 
                    director={movies.find(m => m.Director.Name === match.params.name).Director}
                    movies={movies}
                    onBackClick={() => history.goBack()} />
                  </Col>
                </Row>  
              </Container>
            );
          }} />
        
          <Route path="/users/:userId" render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return ( 
              <Container>
                <Row>
                  <Col className="p-0">
                    <NavView user={user} />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col md={10}>
                    <ProfileView 
                    user={user}
                    onBackClick={() => history.goBack()} />
                  </Col>
                </Row> 
                <Row className="d-flex justify-content-center">
                <Col md={10}>
                  <FavoritesView user={user} movies={movies} />
                  </Col>  
                </Row>
              </Container>
            );
          }} />
        </div>
      </Router>
  );
}
}

let mapStateToProps = state => {
return {
  user: state.user,
  movies: state.movies
}
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);