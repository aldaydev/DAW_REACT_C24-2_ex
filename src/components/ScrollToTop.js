import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // const { pathname } = useLocation();

    useEffect(() => {
        const main = document.querySelector('.App-main');
        main.scrollTo(0, 0);
    });

    return null;
};

export default ScrollToTop;