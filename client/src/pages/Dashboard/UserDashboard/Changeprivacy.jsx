/* eslint-disable react/prop-types */
// Changeprivacy.jsx

import  { useState } from 'react';
import Modal from 'react-modal';
import AxiosPublic from '../../../Axios/AxiosBase';
import AlertMessage from '../../../hooks/UseAlert';

const Changeprivacy = ({ id, option, refetch }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const changeVisivility = (id) => {
        AxiosPublic.put(`updatevisivility/${id}`)
            .then((res) => {           <AlertMessage title={'Privacy Updated'}></AlertMessage>
})
        refetch();
    };

    return (
        <div>
            <button
                className="text-purple-500 font-semibold focus:outline-none"
                onClick={openModal}
            >
                Change Visibility
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
                <h2 className="text-2xl font-semibold mb-4">Change Post Visibility</h2>
                <p className="mb-4">
                    Your post is currently {option === 'public' ? 'public' : 'private'}.
                    Would you like to change it to {option === 'public' ? 'private' : 'public'}?
                </p>
                <button className="text-purple-500 " onClick={() => changeVisivility(id)}>
                    Change to {option === 'public' ? 'Private' : 'Public'}
                </button>
            </Modal>
        </div>
    );
};

export default Changeprivacy;
