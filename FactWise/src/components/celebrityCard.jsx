import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";

import { Accordion, Form } from 'react-bootstrap'; // Import Form from react-bootstrap
// import './style/celebrityCard.css'
import '../style/celebrityCard.css'

const CelebrityCard = ({ id, first, last, dob, gender, picture, country, description, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(`${first} ${last}`);
    const [editedDob, setEditedDob] = useState(dob);
    const [editedGender, setEditedGender] = useState(gender);
    const [editedCountry, setEditedCountry] = useState(country);
    const [editedDescription, setEditedDescription] = useState(description);

    const toggleAccordion = () => {
        if (!isEditing) {
            setIsOpen(!isOpen);
        }
    };

    const handleEditClick = () => {
        const age = parseInt(calculateAge(editedDob), 10);
        if (!isNaN(age) && age > 18) {
            setIsEditing(true);
            setIsOpen(true);
        } else {
            window.alert("Celebrities must be at least 18 years old to edit their profile.");
        }
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedName(`${first} ${last}`);
        setEditedDob(dob);
        setEditedGender(gender);
        setEditedCountry(country);
        setEditedDescription(description);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className='rounded my-4'>
            <Accordion.Item eventKey={id.toString()}>
                <Accordion.Header onClick={toggleAccordion}>
                    <img
                        src={picture}
                        className="rounded-circle me-2"
                        alt={`${first} ${last}`}
                        style={{ width: '40px', height: '40px' }}
                    />
                    {isEditing ? (
                        <div className="d-flex">
                            {isEditing ? (
                                <Form.Control
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                            ) : (
                                <h4>{editedName}</h4>
                            )}
                        </div>
                    ) : (
                        <h4>{`${editedName}`}</h4>
                    )}
                </Accordion.Header>
                <Accordion.Body collapsible={true} isOpen={isEditing}>
                    <div className="row">
                        <div className="col">
                            <div className='title'>Age</div>
                            {isEditing ? (
                                <Form.Control
                                    type="date"
                                    value={editedDob}
                                    onChange={(e) => setEditedDob(e.target.value)}
                                />
                            ) : (
                                <div>
                                    <p>{calculateAge(editedDob)}</p>
                                </div>
                            )}
                        </div>
                        <div className="col">
                            <div className='title'>Gender</div>
                            {isEditing ? (
                                <Form.Control
                                    as="select"
                                    value={editedGender}
                                    onChange={(e) => setEditedGender(e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="Rather not to say">Other</option>
                                </Form.Control>
                            ) : (
                                <div>
                                    <p>{editedGender}</p>
                                </div>
                            )}
                        </div>
                        <div className="col">
                            <div className='title'>Country</div>
                            {isEditing ? (
                                <Form.Control
                                    type="text"
                                    value={editedCountry}
                                    onChange={(e) => setEditedCountry(e.target.value)}
                                />
                            ) : (
                                <div>
                                    <p>{editedCountry}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col'>
                        <div className='title'>Description</div>
                        {isEditing ? ( // Render editable description if in editing mode
                            <>
                                <Form.Control
                                    as="textarea"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                                <div className="d-flex justify-content-end my-3">
                                    <div className="me-3 icons cancel" onClick={handleCancelClick}><FaRegCircleXmark /></div>
                                    <div className="me-5 icons save" onClick={handleSaveClick}><FaRegCircleCheck /></div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <p>{description}</p>
                                <div className="d-flex justify-content-end my-3">
                                    <div className='me-3 icons delete' onClick={handleDeleteClick}><RiDeleteBin6Line /></div>
                                    <div className='me-5 icons edit' onClick={handleEditClick}><MdOutlineModeEdit /></div>
                                </div>
                            </div>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
};

const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    return `${age} years`;
};

CelebrityCard.propTypes = {
    id: PropTypes.number.isRequired,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CelebrityCard;
