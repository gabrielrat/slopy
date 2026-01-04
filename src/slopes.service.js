
const slopes = [
  { id: 1, name: 'Marișel', status: 'open', latitude: 46.664482666584085, longitude: 23.075801846808616 },
  { id: 2, name: 'Straja', status: 'open', latitude: 45.33889253916097, longitude: 23.21639423520306 },
  { id: 3, name: 'Sureanu', status: 'open', latitude: 45.565716898644325, longitude: 23.509292104764537 },
  { id: 4, name: 'Transalpina', status: 'open', latitude: 45.41720246692223, longitude: 23.707044594618672 },
  { id: 5, name: 'Arieșeni', status: 'open', latitude: 46.48, longitude: 22.77 },
  { id: 6, name: 'Azuga', status: 'open', latitude: 45.45, longitude: 25.55 },
  // { id: 7, name: 'Bâlea Lac', status: 'open', latitude: 45.60, longitude: 24.61 },
  { id: 8, name: 'Băișoara', status: 'open', latitude: 46.53834972051659, longitude: 23.306838924234096 },
  { id: 9, name: 'Borșa', status: 'open', latitude: 47.65, longitude: 24.67 },
  { id: 10, name: 'Borsec', status: 'open', latitude: 46.98, longitude: 25.58 },
  { id: 11, name: 'Bușteni', status: 'open', latitude: 45.40, longitude: 25.53 },
  { id: 12, name: 'Buscat', status: 'open', latitude: 46.52855331652234, longitude: 23.27393817731993 },
  { id: 13, name: 'Cârlibaba', status: 'open', latitude: 47.58, longitude: 25.13 },
  { id: 14, name: 'Cavnic', status: 'open', latitude: 47.67, longitude: 23.87 },
  { id: 15, name: 'Cheile Buții', status: 'open', latitude: 44.33, longitude: 23.83 },
  { id: 16, name: 'Durău', status: 'open', latitude: 47.03, longitude: 25.95 },
  { id: 17, name: 'Feleacu', status: 'open', latitude: 46.716571317403755, longitude: 23.642776395075014 },
  { id: 18, name: 'Gura Humorului', status: 'open', latitude: 47.55, longitude: 25.90 },
  { id: 19, name: 'Harghita-Băi', status: 'open', latitude: 46.35, longitude: 25.80 },
  { id: 20, name: 'Harghita Mădăraș', status: 'open', latitude: 46.45, longitude: 25.63 },
  { id: 21, name: 'Izvoare', status: 'open', latitude: 47.20, longitude: 25.16 },
  { id: 22, name: 'Izvorul Mureșului', status: 'open', latitude: 46.40, longitude: 25.60 },
  { id: 23, name: 'Lacu Roșu', status: 'open', latitude: 46.78, longitude: 25.78 },
  { id: 24, name: 'Mogoșa', status: 'open', latitude: 47.65, longitude: 23.75 },
  { id: 25, name: 'Muntele Mic', status: 'open', latitude: 45.36089242621526, longitude: 22.464981914307323 },
  { id: 26, name: 'Păltiniș', status: 'open', latitude: 45.65, longitude: 23.92 },
  { id: 27, name: 'Parâng', status: 'open', latitude: 45.10, longitude: 23.33 },
  { id: 28, name: 'Piatra Neamț', status: 'open', latitude: 46.94, longitude: 26.37 },
  { id: 29, name: 'Poiana Brașov', status: 'open', latitude: 45.60, longitude: 25.55 },
  { id: 30, name: 'Predeal', status: 'open', latitude: 45.50, longitude: 25.57 },
  { id: 31, name: 'Rânca', status: 'open', latitude: 45.30, longitude: 23.70 },
  { id: 32, name: 'Semenic', status: 'open', latitude: 45.18, longitude: 22.06 },
  { id: 33, name: 'Sinaia', status: 'open', latitude: 45.35, longitude: 25.55 },
  { id: 34, name: 'Stâna de Vale', status: 'open', latitude: 46.93, longitude: 22.67 },
  { id: 35, name: 'Suior', status: 'open', latitude: 47.67, longitude: 23.78 },
  { id: 36, name: 'Sovata', status: 'open', latitude: 46.62, longitude: 25.07 },
  { id: 37, name: 'Toplița', status: 'open', latitude: 46.90, longitude: 25.33 },
  { id: 38, name: 'Tușnad Băi', status: 'open', latitude: 46.15, longitude: 25.85 },
  { id: 39, name: 'Valea Bleznei', status: 'open', latitude: 47.47, longitude: 24.90 },
  { id: 40, name: 'Vatra Dornei', status: 'open', latitude: 47.35, longitude: 25.37 },
];

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export function getSlopes() {
    return slopes;
}

export function getNearbySlopes(userLocation, callback) {
    if (userLocation && slopes.length > 0) {
        const slopesWithDistance = slopes.map(slope => ({
            ...slope,
            distanceInKm: getDistanceFromLatLonInKm(
                userLocation.latitude,
                userLocation.longitude,
                slope.latitude,
                slope.longitude
            ),
        })).sort((a, b) => a.distanceInKm - b.distanceInKm);

        if (window.google) {
            const service = new window.google.maps.DistanceMatrixService();
            const batchSize = 25;
            let processedSlopes = [];
            let slopeIndex = 0;

            function processBatch() {
                const batch = slopesWithDistance.slice(slopeIndex, slopeIndex + batchSize);
                if (batch.length === 0) {
                    const sortedSlopes = processedSlopes
                        .sort((a, b) => a.travelTimeValue - b.travelTimeValue);
                    callback(sortedSlopes);
                    return;
                }

                service.getDistanceMatrix(
                    {
                        origins: [new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude)],
                        destinations: batch.map(slope => new window.google.maps.LatLng(slope.latitude, slope.longitude)),
                        travelMode: 'DRIVING',
                    },
                    (response, status) => {
                        if (status === 'OK' && response) {
                            const slopeDetails = {};
                            response.rows[0].elements.forEach((element, index) => {
                                const slopeId = batch[index].id;
                                if (element.status === 'OK') {
                                    slopeDetails[slopeId] = {
                                        duration: element.duration,
                                        distance: element.distance,
                                    };
                                } else {
                                    slopeDetails[slopeId] = {
                                        duration: { text: 'N/A', value: Infinity },
                                        distance: { text: 'N/A' },
                                    };
                                }
                            });

                            const batchProcessedSlopes = batch.map(slope => ({
                                ...slope,
                                travelTime: slopeDetails[slope.id] ? slopeDetails[slope.id].duration.text : 'Loading...',
                                travelTimeValue: slopeDetails[slope.id] ? slopeDetails[slope.id].duration.value : Infinity,
                                distance: slopeDetails[slope.id] ? slopeDetails[slope.id].distance.text : 'Loading...',
                            }));
                            
                            processedSlopes = processedSlopes.concat(batchProcessedSlopes);

                        } else {
                             const batchProcessedSlopes = batch.map(slope => ({
                                ...slope,
                                travelTime: 'N/A',
                                travelTimeValue: Infinity,
                                distance: 'N/A'
                             }));
                             processedSlopes = processedSlopes.concat(batchProcessedSlopes);
                        }
                        
                        slopeIndex += batchSize;
                        processBatch();
                    }
                );
            }

            processBatch();

        } else {
            callback(slopesWithDistance.map(slope => ({
                ...slope,
                travelTime: 'N/A',
                travelTimeValue: Infinity,
                distance: 'N/A'
            })))
        }
    } else {
        callback([]);
    }
}
