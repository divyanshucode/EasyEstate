import { useState } from "react";
import { Form, Link, useParams } from "react-router-dom"
import Perks from "../Perks";
import axios from 'axios';
import PhotosUploader from "../PhotosUploader";



export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [addedPhotos, setAddedPhotos] = useState([]);
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
                            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                           
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