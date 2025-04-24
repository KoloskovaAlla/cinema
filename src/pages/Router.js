import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { FilmPage } from './FilmPage/FilmPage';
import { SeriesPage } from './SeriesPage';
import { KidsFilmsPage } from './KidsFilmsPage';
import { HistoryFilmsPage } from './HistoryFilmsPage';
import { Header } from 'widgets';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<FilmPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/kids" element={<KidsFilmsPage />}/>
        <Route path="/history" element={<HistoryFilmsPage />}/>
      </Routes>
    </BrowserRouter>
  );
};