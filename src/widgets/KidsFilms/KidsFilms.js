import classes from './KidsFilms.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useKidsFilms } from 'shared/hooks';

/**
 * @function KidsFilms
 * @returns {null | JSX.Element}
 */

export const KidsFilms = () => {
  const dispatch = useDispatch();
  const location = useLocation();  

  const [hiddenKidsFilms, setHiddenKidsFilms] = useState(false);

  const { getKidsFilms, kidsFilms, } = useKidsFilms();

  useEffect(() => {
    dispatch(getKidsFilms());
  }, [dispatch, getKidsFilms]);

  useEffect(() => {
    const isCurrentPathName = location.pathname === '/kidsFilms';
    setHiddenKidsFilms(isCurrentPathName);
  }, [location]);

  if (!kidsFilms) return;

  return (
    <div>
      {!hiddenKidsFilms && (
        <section className={classes.kidsFilms}>
          <div className={classes.wrapper}>
            <ul className={classes.list}>
              {kidsFilms.map((kidsFilm, index) => (
                <li key={index} className={classes.item}>
                  фильм
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};
