import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { FilmPage } from './FilmPage/FilmPage';
import { CatalogPage } from './CatalogPage';
import { Header } from 'widgets';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<FilmPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
};