import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSeries } from 'shared/hooks';

export const SeriesPage = () => {
    const { state, getSeries } = useSeries();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeries());
    }, [dispatch]);

    // console.log(state);
    

    return (
        <div>Seriespage</div>
    )
}