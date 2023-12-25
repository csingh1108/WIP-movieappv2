import React, {useContext, useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {formatDateTruncated, formatRole} from "../Helpers/index.jsx";
import {JwtContext} from "../Context/JwtContext.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_USER, GET_ALL_USERS} from "../GraphQLQueries/index.jsx";
import PropTypes from "prop-types";

const AdminUserList = ({filteredUsers}) => {
    AdminUserList.propTypes = {
        filteredUsers: PropTypes.shape({
            searchUsers: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                address: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
                phone: PropTypes.string.isRequired,
                createdDate: PropTypes.string,
                role: PropTypes.string,
            })),
        }),
    };

    const [userData, setUserData] = useState([]);
    const {jwt} = useContext(JwtContext)
    const [deleteUserId, setDeleteUserId] = useState("")

    const { loading, error, data, refetch} = useQuery(GET_ALL_USERS, {
        variables: {jwt},
        fetchPolicy: 'network-only',
    });

    const [deleteUser] = useMutation(DELETE_USER, {
        variables: { id: deleteUserId }
    });

    useEffect(() => {
        if (!filteredUsers) {
            setUserData( (data?.getAllUsers || []));
        } else if (filteredUsers && Array.isArray(filteredUsers.searchUsers)) {
            setUserData(filteredUsers.searchUsers);
        }
    }, [filteredUsers, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    async function handleDeletion() {
        try {
            await deleteUser({
                variables: {
                    jwt: jwt,
                },
            })
            await refetch();
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    }

    const DeletionMsg = () => (
        <div className="flex flex-col">
            <p>Are you sure you want to delete this user?</p>
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

    function warnDeletion(userId) {
        setDeleteUserId(userId)
        toast(<DeletionMsg/>, {
            style: {
                width: '400px',
                height: '150px',
            },
        });
    }
    return (
        <>
            <div className="mt-12 overflow-auto" style={{maxHeight: "600px"}}>
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
                <table
                    className="text-white w-full text-center border-separate border-spacing-y-4 bg-gray-950 p-6 ">
                    <thead className="border-[1px] border-white text-[20px]">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>D.O.B</th>
                        <th>Email</th>
                        <th>Created On</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                    </thead>

                    <tbody>
                    {userData.map((user, index) => (
                        <React.Fragment key={user.id + user.phone}>
                            <tr className="space-2 font-semibold">
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>{user.email}</td>
                                <td>{formatDateTruncated(user.createdAt)}</td>
                                <td>{formatRole(user.role)}</td>
                                <td>
                                    <div className="flex justify-center items-center text-center">
                                        <button
                                            className="border-[1px] border-gray-950 hover:border-white w-[40px] h-[40px] bg-red-600 rounded-[10px] text-[20px] font-bold"
                                            onClick={() => warnDeletion(user.id)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </td>

                            </tr>
                            {index < userData.length - 1 && (
                                <tr>
                                    <td colSpan="8">
                                        <div className="border-b-[1px] border-dimWhite w-full"/>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminUserList;