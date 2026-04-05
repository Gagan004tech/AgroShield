const lat = '28.6139';
const lon = '77.2090';
const radius = 20000;
const query = `
  [out:json][timeout:25];
  (
    node["shop"="agrarian"](around:${radius},${lat},${lon});
    node["shop"="farm"](around:${radius},${lat},${lon});
    node["shop"="garden_centre"](around:${radius},${lat},${lon});
    way["shop"="garden_centre"](around:${radius},${lat},${lon});
    node["amenity"="marketplace"](around:${radius},${lat},${lon});
  );
  out center;
`;

fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'FarmerCropApp/1.0'
  },
  body: `data=${encodeURIComponent(query)}`
}).then(async r => {
  console.log('Status:', r.status);
  console.log('Body:', await r.text());
}).catch(console.error);
