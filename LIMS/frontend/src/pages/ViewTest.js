import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleTestDetails from "../components/TestDataComponents/SingleTestDetails";
import TestSubCategoryDetails from "../components/TestDataComponents/TestSubCategoryDetails";

const ViewTest = () => {

    const { id } = useParams();

    const [Test,setTest] = useState(null);

    useEffect(() => {
        const fetchTest = async() => {
            const response = await fetch('/api/tests/' + id);
            const json = await response.json();

            if( response.ok ) {
                await setTest(json);
            }
        }
             
        fetchTest();
        // eslint-disable-next-line 
    }, [])


    return (
        <div className="viewTest">
            <div className="tests">
                <h4>Test Details</h4>
                { Test ? <SingleTestDetails key={Test._id} Test = {Test} /> : <div className="loading">Loading...</div>}
                <h4>Test subcategories</h4>
                { Test ?
                     Test.subCategories ? 
                        Test.subCategories.map((subCategory) => (
                            <TestSubCategoryDetails key={subCategory._id} subCategory = { subCategory } />
                        ))
                        : <div className="loading">Loading...</div> 
                            : <div className="loading">Loading...</div>}

                <Link to={`/UpdateTest`} state={Test}>
                    <button>Edit Test</button>
                </Link>
            </div>
            
        </div>
    );
}
 
export default ViewTest;