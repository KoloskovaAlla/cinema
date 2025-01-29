import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { FilmPage } from './FilmPage/FilmPage';
import { SeriesPage } from './SeriesPage';
import { Header } from 'widgets';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<FilmPage />} />
        <Route path="/series" element={<SeriesPage />} />
      </Routes>
    </BrowserRouter>
  );
};