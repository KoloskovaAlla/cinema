import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useHistoryFilms, useDocumentTitle } from 'shared/hooks';

export const HistoryFilmsPage = () => {
    const dispatch = useDispatch(); 
    const historyFilmsState = useHistoryFilms();
    const { historyFilms } = historyFilmsState;

    useEffect(() => {
        if (historyFilms) {
            console.log(historyFilms);        
        }
    }, [historyFilms]);
};
