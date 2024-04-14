import { Link } from "react-router-dom";
import { ICities } from "../interfaces/city";

interface CityTableRowProps {
  city: ICities;
  index: number;
  onRowClick: (city: ICities) => void;
}

const CityTableRow: React.FC<CityTableRowProps> = ({ city, index, onRowClick }) => {
  return (
    <tr
      className='text-gray-700 cursor-pointer hover:bg-gray-100'
      key={city.geoname_id}
      onClick={() => onRowClick(city)}
    >
      <td className='px-6 py-4'>{index + 1}</td>
      <td className='px-6 py-4'>{city.geoname_id}</td>
      <Link to={`/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}`}>
        <td className='px-6 py-4'>{city.name}</td>
      </Link>
      <td className='px-6 py-4'>{city.cou_name_en}</td>
      <td className='px-6 py-4'>{city.ascii_name}</td>
      <td className='px-6 py-4'>{city.population}</td>
      <td className='px-6 py-4'>{city.timezone}</td>
      <td className='px-6 py-4'>{city.coordinates.lon},{city.coordinates.lat}</td>
    </tr>
  );
};

export default CityTableRow