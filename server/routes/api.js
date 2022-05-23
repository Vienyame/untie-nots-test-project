'use strict';

const _ = require('underscore');

const MOVIES = require('./data/movies').movies1.map(
  movie => {
    // work with timestamps, it's cleaner
    movie.releaseDate = parseDate(movie.releaseDate);
    return movie;
  }
);

exports.authenticate = function (req, res) {
  res.status(200).json({"statusCode" : 200 ,"user" : req.user});
}

exports.listAll = function (req, res) {
  console.log('List all Movies');
  if (!MOVIES || MOVIES.length === 0) {
    return res.status(204).json();
  }
  return res.status(200).json(MOVIES);
};


exports.filterByTitle = function (req, res) {
  const title = getParam(req, 'title');
  console.log('List by title : title=' + title);

  const MOVIES = _.union(
    _.where(MOVIES, {title: title}),
  );

  return res.status(200).json(MOVIES);
};

exports.filterByGender = function (req, res) {
  const genre = getParam(req, 'genre');
  console.log('List by genre : genre=' + genre);

  const filteredMovies = _.filter(MOVIES, function (movie) {
    return _.contains(movie.genres, genre);
  });

  return res.status(200).json(filteredMovies);
};

exports.get = function (req, res) {
  const id = getId(req);
  console.log('Get movie : id=' + id);

  const movie = _.findWhere(MOVIES, {id: id});

  if (!movie) {
    return res.status(404).json({error: 'Le film avec l\'id "' + id + '" n\'existe pas.'});
  }

  return res.status(200).json(movie);
};

exports.create = function (req, res) {
  const movie = req.body;
  const title = movie.title;
  console.log('Create movie : title=' + title );

  const found = _.findWhere(MOVIES, {title: title});
  if (found) {
    return res.status(409).json({error: 'Le film "' + title + '" existe déjà.'});
  }

  delete movie.id;
  movie.id = createId();
  MOVIES.push(movie);

  return res.status(200).json(movie);
};

exports.update = function (req, res) {
  const id = getId(req);
  console.log('Update movie : id=' + id);

  const movie = req.body;

  const index = _.findIndex(MOVIES, function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({error: 'Le film avec l\'id "' + id + '" n\'existe pas.'});
  }

  Object.assign(MOVIES[index], movie);

  return res.status(200).json(MOVIES[index]);
};

exports.delete = function (req, res) {
  const id = getId(req);
  console.log('Delete movie : id=' + id);

  const index = _.findIndex(MOVIES, function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({error: 'Le film avec l\'id "' + id + '" n\'existe pas.'});
  }

  MOVIES.splice(index, 1);

  if (!MOVIES || MOVIES.length === 0) {
    return res.status(204).json();
  }

  return res.status(200).json(MOVIES);
};

function getParam(req, param) {
  return req.params[param];
}

function getId(req) {
  return getParam(req, 'id');
}

function createId() {
  return new Date().getTime() + "";
}

function parseDate(stringDate) {
  const dates = stringDate.split('/');
  return (new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime());
}
