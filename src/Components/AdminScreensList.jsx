import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_SCREENS } from '../GraphQLQueries/index.jsx';
import PropTypes from 'prop-types';
import { formatDateTruncated } from '../Helpers/index.jsx';
import AdminCreateScreenModal from './AdminCreateScreenModal.jsx';
import { ToastContainer } from 'react-toastify';
import AdminEditScreenModal from "./AdminEditScreenModal.jsx";

const AdminScreensList = () => {
    AdminScreensList.propTypes = {
        filteredScreens: PropTypes.shape({
            searchScreens: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    screenName: PropTypes.string.isRequired,
                    capacity: PropTypes.number.isRequired,
                    createdDate: PropTypes.string,
                    updatedDate: PropTypes.string,
                })
            ),
        }),
    };

    const [createModalVisibility, setCreateModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);
    const [selectedScreenId, setSelectedScreenId] = useState(null);

    const openCreateModal = () => {
        setCreateModalVisibility(true);
    };

    const closeCreateModal = () => {
        setCreateModalVisibility(false);
    };

    const openEditModal = (screenId) => {
        setSelectedScreenId(screenId);
        setEditModalVisibility(true);
    };

    const closeEditModal = () => {
        setSelectedScreenId(null);
        setEditModalVisibility(false);
    };

    const { loading, error, data, refetch } = useQuery(GET_ALL_SCREENS, {
        fetchPolicy: 'network-only',
    });

    const [screens, setScreens] = useState([]);

    useEffect(() => {
        if (data && data.getAllScreens) {
            setScreens(data.getAllScreens);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="mt-12 overflow-auto" style={{maxHeight: '600px'}}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[80px] h-[40px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold "
                >
                    Create
                </button>
            </div>
            <table className="text-white w-full text-center border-separate border-spacing-y-4 bg-gray-950 p-3 mt-7">
                <thead className="border-[1px] border-white text-[20px]">
                <tr>
                    <th>Screen Name</th>
                    <th>Capacity</th>
                    <th>Last Updated</th>
                    <th>Movie Times</th>
                </tr>
                </thead>

                <tbody>
                {screens.map((screen, index) => (
                    <React.Fragment key={screen.id}>
                        <tr className="space-2 font-semibold">
                            <td
                                className="hover:text-sky-400 cursor-pointer text-secondary"
                                onClick={() => openEditModal(screen.id)}
                            >
                                {screen.screenName}
                            </td>
                            <td>{screen.capacity}</td>
                            <td>{formatDateTruncated(screen.updatedDate)}</td>
                        </tr>
                        <tr>
                            <td colSpan="8">
                                <div className="border-b-[1px] border-dimWhite w-full"/>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </table>
            {createModalVisibility && (
                <AdminCreateScreenModal
                    closeModal={() => {
                        closeCreateModal();
                        refetch();
                    }}
                />
            )}
            {editModalVisibility && (
                <AdminEditScreenModal
                    closeModal={() => {
                        closeEditModal();
                        refetch();
                    }}
                    screenId={selectedScreenId}
                />
            )}
        </div>
    );
};

export default AdminScreensList;
