import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import {FilmPage } from './FilmPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />      
        <Route path="/:id" element={<FilmPage />} />
      </Routes>
      </BrowserRouter>

  );
};
