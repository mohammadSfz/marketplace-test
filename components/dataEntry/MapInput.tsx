'use client'

import L from 'leaflet'
import MarkerIcon from '~/node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '~/node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMapEvents } from 'react-leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    loading: () => <p>Loading...</p>,
})
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    loading: () => <p>Loading...</p>,
})
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
    loading: () => <p>Loading...</p>,
})
import React from 'react';

interface AppProps {
    onChange: Function
}

const App: React.FC<AppProps> = ({ onChange }) => {
    const [position, setPosition]: any = useState([51.505, -0.09]);
    const LocationFinderDummy = () => {
        const map = useMapEvents({
            click(e: any) {
                setPosition(e.latlng);
            },
        });
        return null;
    };
    useEffect(() => {
        onChange(position);
    }, [position])
    return (
        <div>
            <MapContainer style={{
                height: '400px',
                width: '100%'
            }} center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationFinderDummy />
                <Marker icon={
                    new L.Icon({
                        iconUrl: MarkerIcon.src,
                        iconRetinaUrl: MarkerIcon.src,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow.src,
                        shadowSize: [41, 41],
                    })
                } position={position}>

                </Marker>
            </MapContainer>
        </div>
    )
};

export default App;

