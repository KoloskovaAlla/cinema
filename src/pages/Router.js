import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { FilmPage } from './FilmPage/FilmPage';
import { Header } from 'components'; // Импортируем компонент Header

export const Router = () => {
  return (
    <BrowserRouter>
      <Header /> {/* Перемещаем компонент Header внутрь BrowserRouter */}
      <Routes>
        <Route path="/" element={<HomePage />} />      
        <Route path="/:id" element={<FilmPage />} />
      </Routes>
    </BrowserRouter>
  );
};