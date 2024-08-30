import Link from "next/link";
import { useRouter } from "next/navigation";

const CarSimpleCard = ({ car }) => {
    const router = useRouter()

    const toLink = (carId) => {
        router.push(`/cars/detail/${carId}`);
    }

    return (
        <div
            onClick={() => toLink(car.id)}
            key={car.id}
            className="block border-gray-300 rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105 bg-white cursor-pointer"
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
        </div>
    )
}

export default CarSimpleCard;
