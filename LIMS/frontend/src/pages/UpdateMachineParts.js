import UpdateMachinePart from "../components/machineComponent/UpdateMachinePartsForm";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";

const EditMachinePartsDetails = () => {
    const { id } = useParams();

    // const  {state} = useLocation()
    const [machine,setMachine] = useState(null);
    
    useEffect(() => {
        const fetchMachineHistory = async() => {
            const response = await fetch('/api/machineParts/' + id);
            const json = await response.json();
    
            if( response.ok ) {
                await setMachine(json);
            }
        }
             
        fetchMachineHistory();
         // eslint-disable-next-line
    }, [])
    // // console.log(state.id);

     return ( 
        <div className="history">
            <div className="machines">
                {machine && <UpdateMachinePart machine = {machine}/>}
            </div>
        </div>
     );
}
 
export default EditMachinePartsDetails