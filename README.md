# MovieDB React Application

A modern React application for browsing movies using The Movie Database (TMDB) API. Built with Vite and Material-UI v5.

## Features
* Browse popular movies
* View movie details
* Rate movies
* Add movies to favorites
* User authentication
* Responsive design

## Tech Stack
* React 18
* React Router v6
* Material-UI v5
* Styled Components
* Formik & Yup for form handling
* Vite for build tooling

## Getting Started
1. Clone the repository:

```bash
git clone https://github.com/yourusername/moviedb-react.git
```

2. Install dependencies:

```bash
cd moviedb-react
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure
```
src/
  ├── components/
  │   ├── MovieCard.jsx
  │   ├── MovieGrid.jsx
  │   ├── Header.jsx
  │   └── MovieDetails.jsx
  ├── containers/
  │   ├── Login.jsx
  │   ├── HomeMovieList.jsx
  │   ├── FavoriteList.jsx
  │   └── RatedList.jsx
  ├── App.jsx
  └── main.jsx
```

## Available Scripts
* `npm run dev` - Starts development server
* `npm run build` - Creates production build
* `npm run preview` - Preview production build

## Contributing
Feel free to submit issues and pull requests.

## License
MIT License
