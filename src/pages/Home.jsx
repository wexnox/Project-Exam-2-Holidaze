import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Holidaze | Home';
    }, []);
    return (
        <>
            <div className="container mx-auto relative">
                <div className="bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute  lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12"></div>
                <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">Home @</div>
            </div>
        </>
    );
};
export default Home;
