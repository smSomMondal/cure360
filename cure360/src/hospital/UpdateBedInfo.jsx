import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatedBedInfo = () => {
  const [bedInfo, setBedInfo] = useState([]);
  const [hospitalId,setHospitalId]=useState()
  const [selectedBed, setSelectedBed] = useState(null);
  const [newAadhar, setNewAadhar] = useState('');


  const fachBed = async () => {
    try {
      console.log("hiii");

      const storedData = JSON.parse(localStorage.getItem('user'));
      const token = storedData?.token;
      const Res = await axios.post("http://127.0.0.1:5000/hospital/hosData", {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      console.log(Res.data.data.bedInfo);
      if(Res.status===200){
        setHospitalId(Res.data.data._id)
        setBedInfo(Res.data.data.bedInfo)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fachBed()
  }, []);

  const updateBed = async () => {
    const payload = {
      bedType: selectedBed.bedType,
      maxCapacity: selectedBed.maxCapacity,
    };
    // await axios.put(`/api/hospitals/${hospitalId}/bedinfo`, payload);
    await axios.post(`http://127.0.0.1:5000/hospital/${hospitalId}/bedinfo`, payload);
  };

  const addAadhar = async () => {
    await axios.post(`http://127.0.0.1:5000/hospital/${hospitalId}/bedinfo`, {
      bedType: selectedBed.bedType,
      addAadhar: [newAadhar]
    });
    setNewAadhar('');
  };

  const removeAadhar = async (aadhar) => {
    await axios.post(`http://127.0.0.1:5000/hospital/${hospitalId}/bedinfo`, {
      bedType: selectedBed.bedType,
      removeAadhar: [aadhar]
    });
  };

  return (
    <div>
      <h2>Bed Info Editor</h2>
      <select onChange={(e) => setSelectedBed(bedInfo.find(b => b.bedType === e.target.value))}>
        <option value="">Select Bed Type</option>
        {bedInfo.length > 0 ? (bedInfo.map(bed => <option key={bed._id} value={bed.bedType}>{bed.bedType}</option>)) : (<>no data fpund</>)}
      </select>

      {selectedBed && (
        <div>
          <h3>{selectedBed.bedType}</h3>
          <label>Max Capacity: </label>
          <input
            type="number"
            value={selectedBed.maxCapacity}
            onChange={(e) => setSelectedBed({ ...selectedBed, maxCapacity: parseInt(e.target.value) })}
          />
          <button onClick={updateBed}>Update</button>

          <div>
            <h4>Aadhar Numbers</h4>
            <ul>
              {selectedBed.addharNo.map(a => (
                <li key={a}>
                  {a} <button onClick={() => removeAadhar(a)}>Remove</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add Aadhar"
              value={newAadhar}
              onChange={e => setNewAadhar(e.target.value)}
            />
            <button onClick={addAadhar}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatedBedInfo;
