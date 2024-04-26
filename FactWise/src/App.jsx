import { useState } from 'react';
import './App.css';
// import CelebrityCard from './components/celebrityCard';
import CelebrityCard from './components/celebrityCard';

import { Accordion, Form, Modal, Button } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import celebritiesData from './assets/celebrities.json'
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [celebrities, setCelebrities] = useState(celebritiesData);
  const [showModal, setShowModal] = useState(false);
  const [celebrityToDelete, setCelebrityToDelete] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteCelebrity = (id) => {
    // Find the celebrity to delete
    const celebrity = celebrities.find((celebrity) => celebrity.id === id);
    // Set the celebrity to delete and show the modal
    setCelebrityToDelete(celebrity);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Filter out the celebrity to delete
    const updatedCelebrities = celebrities.filter((celebrity) => celebrity.id !== celebrityToDelete.id);
    // Update the state with the filtered list and close the modal
    setCelebrities(updatedCelebrities);
    setShowModal(false);
  };

  const filteredCelebrities = celebrities.filter((celebrity) =>
    `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Form className="search-bar mb-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search celebrity by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <CiSearch className="search-icon" />
        </Form.Group>
      </Form>

      <Accordion>
        {filteredCelebrities.map((celebrity) => (
          <CelebrityCard
            key={celebrity.id}
            id={celebrity.id}
            first={celebrity.first}
            last={celebrity.last}
            dob={celebrity.dob}
            gender={celebrity.gender}
            email={celebrity.email}
            picture={celebrity.picture}
            country={celebrity.country}
            description={celebrity.description}
            onDelete={() => handleDeleteCelebrity(celebrity.id)} // Pass the delete function as a prop
          />
        ))}
      </Accordion>

      {/* Modal for confirmation dialog */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body closeButton>
          Are you sure you want to delete {celebrityToDelete && celebrityToDelete.first}{' '}
          {celebrityToDelete && celebrityToDelete.last}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)} className="">Cancel</Button>
          <Button onClick={handleConfirmDelete} className="btn  del">Delete</Button>

        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default App;