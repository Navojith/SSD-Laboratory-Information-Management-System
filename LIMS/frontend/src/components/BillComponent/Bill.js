import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/BillStyles/bill.css';

const Bill = ({ patient }) => {
  const [Tests, setTests] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedVal, setSelectedVal] = useState([]);
  const [noOfDropdowns, setNoOfDropdowns] = useState([]);
  const [services, setServices] = useState([]);
  const [outsourced, setOutsourced] = useState([]);
  const ref = useRef([]);

  //save test ids
  const [billedTests, setBilledTests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch('/api/tests');
      const json = await response.json();

      if (response.ok) {
        setTests(json);
      }
    };

    fetchTests();
  }, []);

  const calTotal = (e, index) => {
    const price = e.target.value;
    const selectedIndex = e.target.selectedIndex;

    setSelectedVal((prevState) => {
      let list = [...prevState];
      list[index] = price;
      calSum(list);
      return list;
    });

    if (Tests[selectedIndex - 1]?.outsourced === 'true') {
      setBilledTests((prevArray) => [
        ...prevArray,
        Tests[selectedIndex - 1]?._id,
      ]); //setBilledTests

      setOutsourced((prevState) => {
        let list = [...prevState];
        list[index] = Tests[selectedIndex - 1]?.testName;
        console.log('outsourced tests : ' + list);
        return list;
      });
      setServices((prevState) => {
        let list = [...prevState];
        list[index] = 0;
        console.log('normal tests : ' + list);
        return list;
      });
    } else {
      setBilledTests((prevArray) => [
        ...prevArray,
        Tests[selectedIndex - 1]?._id,
      ]); //setBilledTests

      setServices((prevState) => {
        let list = [...prevState];
        list[index] = Tests[selectedIndex - 1]?.testName;
        return list;
      });
      setOutsourced((prevState) => {
        let list = [...prevState];
        list[index] = 0;
        return list;
      });
    }
  };

  const calSum = (list) => {
    // calculate the sum of all selected values
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] !== null) {
        sum += Number(list[i]);
      }
    }
    setTotal(sum);
  };

  const Input = ({ index }) => {
    return (
      <>
        <select
          ref={(el) => (ref.current[index] = el)}
          onChange={(e) => {
            calTotal(e, index);
          }}
          id="bill-selectServices"
          value={selectedVal[index] || ''}
        >
          <option value="" disabled hidden>
            Select an Item
          </option>
          {Tests &&
            Tests.map((t) => (
              <option key={t._id} value={t.price}>
                {t.testName}
              </option>
            ))}
        </select>
      </>
    );
  };
  const removeInputFields = (index) => {
    //cal total
    const newVal = [...selectedVal];
    newVal.splice(index, 1);
    calSum(newVal);
    setSelectedVal(newVal);

    //outsourced
    const newOutsourcedArr = [...outsourced];
    newOutsourcedArr.splice(index, 1);
    setOutsourced(newOutsourcedArr);

    //normal
    const newServicesArr = [...services];
    newServicesArr.splice(index, 1);
    setServices(newServicesArr);

    //dropdown count
    const newDrop = noOfDropdowns.filter((_, i) => i !== index);
    setNoOfDropdowns(newDrop);
  };

  const handleClick = (e) => {
    setNoOfDropdowns((prevState) => [...prevState, '1']);
  };

  const cancelBill = () => {
    navigate(-1);
  };

  const confirmBill = async () => {
    const patientName = patient.firstName + ' ' + patient.lastName;
    const patientId = patient._id;
    let outsourceServices = [];
    let normalServices = [];
    let Total = Number(total);

    for (let i = 0; i < outsourced.length; i++) {
      if (outsourced[i] == 0 || outsourced[i] === '0') continue;
      else outsourceServices.push(outsourced[i]);
    }

    for (let i = 0; i < services.length; i++) {
      if (services[i] == 0 || services[i] === '0') continue;
      else normalServices.push(services[i]);
    }

    const bill = {
      patientId,
      patientName,
      normalServices,
      outsourceServices,
      Total,
    };

    const response = await fetch('/api/bills/', {
      method: 'POST',
      body: JSON.stringify(bill),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    let status = '';
    if (!response.ok) {
      status = 'Failed to create the account';
    } else {
      status = 'Bill Added';

      createSample(patient._id, billedTests);
    }
    console.log('Status : ' + status);
    console.log('billed tests' + billedTests);
    navigate('./print-bill', { state: { status: status } });
  };

  //create sample and test result
  const createSample = async (patient, billedTests) => {
    try {
      const response = await fetch('/api/samples/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient, billedTests }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" receipt mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">MEDILINE Receipt</h1>
        </div>
      </div>
      <br />
      <hr />
      <div className="row mt-3">
        <div className="col-md-6">
          <b>Name :</b> {patient.firstName} {patient.lastName}
        </div>
        <div className="col-md-6">
          <b>NIC :</b> {patient.NIC}
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-md-6">
          <b>Services</b>
        </div>
        <div className="col-md-6">
          {noOfDropdowns.map((data, index) => (
            <div className="mt-3" key={index}>
              <Input index={index} />
              <button
                className="btnDelete"
                onClick={(e) => removeInputFields(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            id="bill-add-service-btn"
            className="btn"
            onClick={handleClick}
          >
            Add service
          </button>
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="">Total : Rs. {total}</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 col-lg-12 mx-auto d-flex justify-content-end">
          <button className="btnSubmit mx-2" onClick={confirmBill}>
            Confirm
          </button>
          <button className="btnDelete" onClick={cancelBill}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
