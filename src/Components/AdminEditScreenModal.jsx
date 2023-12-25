import React, {useContext, useEffect, useState} from 'react';
import {JwtContext} from "../Context/JwtContext.jsx";
import {useLazyQuery, useMutation, useQuery,} from "@apollo/client";
import {DELETE_MOVIE, DELETE_SCREEN, GET_SCREEN_BY_ID, UPDATE_SCREEN} from "../GraphQLQueries/index.jsx";
import {toast, ToastContainer} from "react-toastify";

const AdminEditScreenModal = ({closeModal, screenId}) => {
    const [updateScreenData, setUpdateScreenData] = useState({
        screenName: "",
        capacity: 0,
    });

    const { jwt } = useContext(JwtContext);

    const [updateScreen] = useMutation(UPDATE_SCREEN);
    const [deleteScreen] = useMutation(DELETE_SCREEN, {
        variables: { id: screenId }
    });

    const { loading, error, data } = useQuery(GET_SCREEN_BY_ID, {
        variables: { id: screenId || '' },
    });

    useEffect(() => {
        if(data != null){
            setUpdateScreenData({
                screenName: data.getScreenById.screenName,
                capacity: data.getScreenById.capacity
            })
        }
    }, [data]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateScreenData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleSubmitScreen() {
        const isFormValid = Object.values(updateScreenData).every((value) => value !== '');
        if (isFormValid && jwt !== null) {
            try {
                await updateScreen({
                    variables: {
                        id: screenId,
                        ...updateScreenData,
                        jwt: jwt,
                    },
                })

                closeModal()
            } catch (error) {
                console.error('Error updating screen:', error.message);
            }
        } else {
            toast.error('There was an error.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }

    async function handleDeletion() {
        try {
            await deleteScreen({
                variables: {
                    jwt: jwt,
                },
            })
            closeModal()
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    }

    const DeletionMsg = ({ closeToast, toastProps }) => (
        <div className="flex flex-col">
            <p>Are you sure you want to delete this screen?</p>
            <div className="flex flex-row justify-around mt-8">
                <button
                    type="button"
                    onClick={handleDeletion}
                    className="mx-8 rounded-full px-2 py-1 bg-black text-red-500 border-red-500 border-[2px] w-[120px] h-[50px] hover:text-black hover:bg-red-500 font-montserrat font-bold"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    function warnDeletion() {
        toast(<DeletionMsg/>, {
            style: {
                width: '400px',
                height: '150px',
            },
        });
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
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
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
            <div className="bg-white p-8 rounded shadow-lg z-50 font-montserrat">
                <div className="flex flex-row mb-2">
                    <div
                        className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                        <p className="text-secondary font-playfair text-[24px]">A</p>
                        <p className="text-white font-playfair text-[24px]">T</p>
                    </div>
                    <h2 className="text-2xl font-bold mt-1 ml-2">Update Screen</h2>
                </div>
                <label className="block mb-4">
                    Screen Name:
                    <input
                        type="text"
                        name="screenName"
                        value={updateScreenData.screenName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Capacity:
                    <input
                        type="number"
                        name="capacity"
                        value={updateScreenData.capacity}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </label>
                <div className="flex justify-center items-center mt-8">
                    <button
                        type="button"
                        onClick={handleSubmitScreen}
                        className="mx-8 rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="mx-8 rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-red-500 hover:text-red-500 font-montserrat font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={warnDeletion}
                        className="mx-8 rounded-full px-2 py-1 bg-black text-red-500 border-red-500 border-[2px] w-[120px] h-[50px] hover:bg-red-500 hover:text-black font-montserrat font-bold"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminEditScreenModal;