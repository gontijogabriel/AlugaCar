import Link from "next/link";


const CarSimpleCard = ({car}) => {

    return (
        <Link
            href={`cars/detail/${car.id}`}
            key={car.id}
            className="block border-gray-300 rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105 bg-white"
        >
            <img
                src={car.image.url}
                alt={car.model}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <p className="text-lg font-semibold mb-2">{car.model}</p>
                <p className="text-gray-600 mb-1">{car.brand}</p>
                <p className="text-gray-600">R$ {car.day_price} / dia</p>
            </div>
        </Link>
    )
}

export default CarSimpleCard;