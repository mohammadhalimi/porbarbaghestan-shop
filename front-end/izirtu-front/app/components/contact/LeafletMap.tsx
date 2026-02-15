export function LeafletMap() {
    const lat = 35.730314;  // latitude
    const lng = 51.444864; // longitude

    const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
    return (
        <div className="w-full h-96 lg:h-125 rounded-b-2xl overflow-hidden">
            <iframe
                src={`${mapUrl}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="نقشه محل شرکت پربار باغستان"
            ></iframe>
        </div>
    )
}