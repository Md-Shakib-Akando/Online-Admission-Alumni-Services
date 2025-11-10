"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon (location pin)
const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const ContactMap = () => {
    return (
        <div className="w-full h-96 rounded-xl z-10 overflow-hidden shadow-lg">
            <MapContainer
                center={[24.9254, 89.3486]}
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-full"
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />


                <Marker position={[23.759946, 90.404314]} icon={markerIcon}>
                    <Popup>Pundra University</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default ContactMap;
