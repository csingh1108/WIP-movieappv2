import {useState} from "react";

const RegisterModal = ( {onClose}) => {
    const [submissionData, setSubmissionData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: null,
        password: "",
    });

    const [selectedDate, setSelectedDate ] = useState({
            month: "",
            day: "",
            year: "",
        }
    )

    const defaultLabels = {
        month: "Month",
        day: "Day",
        year: "Year",
    };

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const generateDays = (month, year) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, index) => index + 1);
    };

    const[ validationErrors, setValidationErrors ] = useState({});

    const handleInputChange = (fieldName, value) => {
        setSubmissionData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleDateChange = (field, value) => {
        setSelectedDate((prevDate) => ({
            ...prevDate,
            [field]: value,
        }));
    };

    const updateDateOfBirth = () => {
        const { month, day, year } = selectedDate;
        if (month !== defaultLabels.month && day !== defaultLabels.day && year !== defaultLabels.year) {
            const formattedDateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            setSubmissionData((prevData) => ({
                ...prevData,
                dateOfBirth: formattedDateOfBirth,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};

        if (!submissionData.firstname) {
            errors.firstname = 'First name is required';
        }
        if (!submissionData.lastname) {
            errors.lastname = 'Last name is required';
        }
        if (!submissionData.email) {
            errors.email = 'Email is required';
        }
        if (!submissionData.phone) {
            errors.phone = 'Phone is required';
        }
        if (!submissionData.address) {
            errors.address = 'Address is required';
        }
        if (!submissionData.dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        }
        if (!submissionData.password) {
            errors.password = 'Password cannot be empty';
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        } else {
            fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            })
                .then((response) => response.json())
                .then((data) => {
                    onClose();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        };


    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-neutral-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                                    <p className="text-secondary font-playfair text-[24px]">A</p>
                                    <p className="text-white font-playfair text-[24px]">T</p>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-[18px] font-semibold leading-6 text-white font-montserrat" id="modal-title">
                                        Create an Account
                                    </h3>
                                    <div className="mt-2">
                                        <p className="font-montserrat text-white">Enter first name:</p>
                                        <input
                                            type="text"
                                            id="firstname"
                                            value={submissionData.firstname}
                                            onChange={(e) => handleInputChange('firstname', e.target.value)}
                                            className={`sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md1`}
                                        />
                                        {validationErrors.firstname && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.firstname}</div>}
                                        <p className="font-montserrat text-white mt-3">Enter last name:</p>
                                        <input
                                            type="text"
                                            id="lastname"
                                            value={submissionData.lastname}
                                            onChange={(e) => handleInputChange('lastname', e.target.value)}
                                            className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        {validationErrors.lastname && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.lastname}</div>}
                                        <p className="font-montserrat text-white  mt-3">Enter email:</p>
                                        <input
                                            type="text"
                                            id="email"
                                            value={submissionData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        {validationErrors.email && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.email}</div>}
                                        <p className="font-montserrat text-white mt-3">Enter date of birth:</p>
                                        <div className="flex items-center mt-3 justify-between">
                                            <select
                                                id="dateOfBirthMonth"
                                                value={selectedDate.month}
                                                onChange={(e) => handleDateChange("month", e.target.value)}
                                                onBlur={updateDateOfBirth}
                                                className="px-3 py-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="" disabled hidden>
                                                    {defaultLabels.month}
                                                </option>
                                                {monthNames.map((month, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                id="dateOfBirthDay"
                                                value={selectedDate.day}
                                                onChange={(e) => handleDateChange("day", e.target.value)}
                                                onBlur={updateDateOfBirth}
                                                className="px-3 py-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="" disabled hidden>
                                                    {defaultLabels.day}
                                                </option>
                                                {generateDays(selectedDate.month, selectedDate.year).map((day) => (
                                                    <option key={day} value={day}>
                                                        {day}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                id="dateOfBirthYear"
                                                value={selectedDate.year}
                                                onChange={(e) => handleDateChange("year", e.target.value)}
                                                onBlur={updateDateOfBirth}
                                                className="px-3 py-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="" disabled hidden>
                                                    {defaultLabels.year}
                                                </option>
                                                {Array.from({length: 2007 - 1930 + 1}, (_, index) => 2007 - index).map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {validationErrors.dateOfBirth && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.dateOfBirth}</div>}
                                        <p className="font-montserrat text-white mt-3">Enter Address:</p>
                                        <input
                                            type="text"
                                            id="address"
                                            value={submissionData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        {validationErrors.address && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.address}</div>}
                                        <p className="font-montserrat text-white mt-3">Enter phone number:</p>
                                        <p className="font-montserrat text-white text-[12px]">No dashes or spaces</p>
                                        <input
                                            type="text"
                                            id="phone"
                                            value={submissionData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        {validationErrors.phone && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.phone}</div>}
                                        <p className="font-montserrat text-white mt-3">Enter password:</p>
                                        <input
                                            type="text"
                                            id="password"
                                            value={submissionData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        {validationErrors.password && <div
                                            className="text-red-600 font-montserrat font-semibold">{validationErrors.password}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={(event) => handleSubmit(event)}
                                className="inline-flex w-full justify-center rounded-md border-[1px] border-white bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-sky-400 hover:border-sky-400 sm:ml-3 sm:w-auto"
                            >
                                Register
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-black hover:text-white sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
