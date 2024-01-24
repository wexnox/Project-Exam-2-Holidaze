import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Holidaze | Home';
    }, []);
    return (
        <>
            <div className="container mx-auto relative">
                <div className=""></div>
                <div className="">Home</div>
            </div>
        </>
    );
};
export default Home;
