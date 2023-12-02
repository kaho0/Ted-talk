/* eslint-disable react/prop-types */

import useAuth from "../../hooks/useAuth";

import { useState } from 'react';
import Modal from 'react-modal';
import AxiosSecure from "../../Axios/AxiosSecure";
import Swal from "sweetalert2";

const AddCommentModal = ({ id }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [comment, setComment] = useState('');
    const { user } = useAuth()
    let email = ''
    if (user) email = user.email
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setComment('');
    };

    const addComment = () => {
        AxiosSecure.put(`/addcomment/${id}`, { comment, email })
            .then((res) => {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Comment Added',
                    showConfirmButton: false,
                    timer: 1500,
                });
                closeModal();
            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    return (
        <div>
            <button
                className="text-purple-500 font-semibold focus:outline-none"
                onClick={openModal}
            >
                Add Comment
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        right: 'auto',
                        bottom: 'auto',
                        width: '60%', // Adjust the width of the modal
                        borderRadius: '8px',
                        border: 'none',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        outline: 'none',
                        padding: '20px',
                    },
                }}
            >
                {/* Modal content */}
                <div className="text-right mb-4">
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Add Comment</h2>
                <textarea
                    className="w-full h-40 p-2 border rounded-md mb-4"
                    placeholder="Enter your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className="text-purple-500 ml-2 mb-1 " onClick={addComment}>
                    Add Comment
                </button>
            </Modal>
        </div>
    );
};

export default AddCommentModal;
