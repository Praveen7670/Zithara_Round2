import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  //get data
  useEffect(() => {
    fetchData();
  }, [currentPage, sortBy]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //serach logic
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = data.filter(item => {
    const customer_name = item.customer_name || ''; // Handling potential undefined values
    const location = item.location || ''; // Handling potential undefined values
    return (
      customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  const sortedData = sortBy ? [...filteredData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  }) : filteredData;

  //pagination logic

  const itemsPerPage = 20;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mt-3">
      <input type="text" className="form-control mb-3" placeholder="Search by name or location" value={searchTerm} onChange={handleSearch} />
      <table className="table table-light table-rounded">
        <thead className='table-dark'>
          <tr className='my-auto'>
            <th>S_No</th>
            <th>Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Age</th>
            <th className=''>Date 
            <button className='btn p-0 ms-1 '  onClick={() => handleSort("created_at")}>
                               {sortOrder === "asc" ? 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="14" height="14">
                        <path fill="white" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/>
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="14" height="14">
                        <path fill="white" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                    </svg>}
            </button>
            </th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className='h'>
              <td>{item.sno}</td>
              <td>{item.customer_name}</td>
              <td>{item.location}</td>
              <td>{item.phone}</td>
              <td>{item.age}</td>
              <td>{item.created_at.split("T")[0]}</td>
              <td>{item.created_at.split("T")[1].split(".")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button className="btn  mr-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="24" height="24">
                 <path fill="#343a40" d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/>
              </svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'} mr-2 mx-2`} onClick={() => goToPage(i + 1)}>{i + 1}</button>
        ))}
        <button className="btn " onClick={goToNextPage} disabled={currentPage === totalPages}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="24" height="24">
                 <path fill="#343a40" d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
             </svg>
        </button>
      </div>
    </div>
  );
}

export default MyComponent;
