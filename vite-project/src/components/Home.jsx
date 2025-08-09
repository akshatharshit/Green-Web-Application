import { ArrowRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPlantDetails } from '../slices/plantSlice';
import NavBar from './NavBar';
import Footer from './Footer';
import Middle from './Middle';
import { fetchUPI } from '../slices/upiSlice';

const Home = () => {
    const { Details, loading } = useSelector((state) => state.plant);
    const dispatch = useDispatch();

    const handle = () => {
        dispatch(fetchPlantDetails());
    }
    dispatch(fetchUPI);
    return (
        <>

            {/* <button onClick={handle}>Fetch Plant Details</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p>{Details?.text || "No fact available"}</p> 
                    <p>{Details?.id}</p>
                    <p>{Details?.source_url}</p>
                    <p>{Details?.permalink}</p>
                </>
            )} */}


            
            <Middle />
    
        </>
    );
}

export default Home;
