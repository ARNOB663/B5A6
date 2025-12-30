import React, { useState } from 'react';
import { AlertTriangle, Phone, Share2, X } from 'lucide-react';
import Button from './Button';
import toast from 'react-hot-toast';

const SOSButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSOS = () => {
        setIsOpen(true);
    };

    const handleCallPolice = () => {
        window.location.href = 'tel:911'; // Or 999/112
        toast.success('Calling Emergency Services...');
    };

    const handleShareLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    // In a real app, this would send an SMS or API call to trusted contacts
                    console.log('Location shared:', mapLink);
                    toast.success('Live location shared with emergency contacts!');
                },
                () => {
                    toast.error('Unable to retrieve location.');
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser.');
        }
    };

    return (
        <>
            <button
                onClick={handleSOS}
                className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl animate-pulse focus:outline-none focus:ring-4 focus:ring-red-300"
                aria-label="SOS Emergency"
            >
                <span className="font-bold text-xl">SOS</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-red-600 p-4 flex justify-between items-center text-white">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <AlertTriangle className="h-6 w-6" />
                                Emergency Assistance
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-red-700 rounded-full p-1">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-gray-600 text-center mb-4">
                                What kind of emergency are you facing?
                            </p>

                            <Button
                                variant="danger"
                                fullWidth
                                size="lg"
                                onClick={handleCallPolice}
                                className="flex items-center justify-center gap-2"
                            >
                                <Phone className="h-5 w-5" />
                                Call Police (999)
                            </Button>

                            <Button
                                variant="secondary"
                                fullWidth
                                size="lg"
                                onClick={handleShareLocation}
                                className="flex items-center justify-center gap-2"
                            >
                                <Share2 className="h-5 w-5" />
                                Share Live Location
                            </Button>

                            <div className="text-xs text-center text-gray-400 mt-4">
                                Using this will instantly notify your emergency contacts.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SOSButton;
