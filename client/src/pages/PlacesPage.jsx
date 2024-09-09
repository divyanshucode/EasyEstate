import { useState } from "react";
import { Form, Link, useParams } from "react-router-dom"
import Perks from "../Perks";


export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {
                action === 'new' && (
                    <div>
                        <form action="">
                            {preInput('Title', 'Title of your place, Short and Catchy')}

                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title, for eg : My Lovely Apartment" />

                            {preInput('Address', 'Address to this place')}
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />


                            {preInput('Photos', 'Upload photos of your place , better to upload 3-4 photos')}
                            <div className="flex gap-2">
                                <input type='text' value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Photo URL" />
                                <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                            </div>
                            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                    </svg>
                                    Upload
                                </button>

                            </div>
                            {preInput('Description', 'Describe your place in detail')}
                            <textarea value={description} onChange={e => setDescription(e.target.value)} />

                            {preInput('Perks', 'Select the perks of your place')}
                            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                                <Perks selected={perks} onChange={setPerks} />
                            </div>

                            {preInput('Extra info', 'Any extra information you want to add')}
                            <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />


                            {preInput('Check in and Check out time', 'Set the check in and check out time')}
                            <div className="grid gap-2 sm:grid-cols-3 ">
                                <div>
                                    <h3 className="mt-2 -mb-1">Check in time</h3>
                                    <input type="text" value={checkInTime}
                                        onChange={e => setCheckInTime(e.target.value)}
                                         placeholder="Eg: 14:00" />

                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Check out time</h3>
                                    <input type="text" value={checkOutTime}
                                        onChange={e => setCheckOutTime(e.target.value)}
                                         placeholder="Eg: 22:00" />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                    <input type="number" value={maxGuests}
                                        onChange={e => setMaxGuests(e.target.value)}
                                        placeholder="Eg: 2" />
                                </div>
                            </div>
                            <div>
                                <button className="primary my-4">Save</button>
                            </div>

                        </form>
                    </div>

                )
            }

        </div>
    )
}