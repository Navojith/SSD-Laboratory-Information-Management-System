const TestSubCategoryDetails = ({ subCategory }) => {
    return (  
        <div className="firstSection">
                <h4>
                    {subCategory.category}
                </h4>
                {subCategory.categoryHeading &&
                    <div className="row">
                        <div className="col-12">
                            <strong>Caegory Heading: </strong>
                            {subCategory.categoryHeading}
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-6">
                        <strong>UOM: </strong>
                        {subCategory.UOM}
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-4">
                        <strong>Male Ref Range: </strong>
                        {subCategory.startMRef}
                        {subCategory.operatorM}
                        {subCategory.endMRef}
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-4">
                        <strong>Female Ref Range: </strong>
                        {subCategory.startFRef}
                        {subCategory.operatorF}
                        {subCategory.endFRef}
                    </div>
                </div>

                {(subCategory.startBRef || subCategory.operatorB || subCategory.endBRef) &&
                <div className="row">
                    <div className="col-4">
                        <strong>Baby Ref Range: </strong>
                        {subCategory.startBRef}
                        {subCategory.operatorB}
                        {subCategory.endBRef}
                    </div>
                </div>
                }
                    
            </div>
    );
}
 
export default TestSubCategoryDetails;