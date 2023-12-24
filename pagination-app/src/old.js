import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      paginate(page);
    }
  };

  return (
    <nav>
      <div className="pagination">
        <div className="page-item">
          <button onClick={() => goToPage(currentPage - 1)} className="page-link">
            Previous
          </button>
        </div>
        <div className="page-item">
          <div className="page-link">{currentPage}</div>
        </div>
        <div className="page-item">
          <button onClick={() => goToPage(currentPage + 1)} className="page-link">
            Next
          </button>
        </div>
      </div>
    </nav>
  );
};

const DataTable = ({ currentItems }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const App = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => {
            setItems(response.data);
        })
        .catch(error => {
            alert("Failed to fetch data")
        });
}, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Employee Data Table</h1>
      <DataTable currentItems={currentItems} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
