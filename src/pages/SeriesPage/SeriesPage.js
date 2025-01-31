import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSeries } from 'shared/hooks';

export const SeriesPage = () => {
    const dispatch = useDispatch();

    const seriesState = useSeries();
    const { series } = seriesState;

    useEffect(() => {
        dispatch(seriesState.getSeries());
    }, [dispatch]);  
    
    useEffect(() => {
        // if (series) console.log(series);
    }, [series]);
    

    return (
        <div>Seriespage</div>
    )
}