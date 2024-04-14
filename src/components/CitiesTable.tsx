import React from 'react';
import { ICities } from '../interfaces/city';
import { useNavigate } from 'react-router-dom';
import CityTableHeader from './CityTableHeader';
import CityTableRow from './CityTableRow';

//Main CitiesTable component
interface CitiesTableProps {
  cities: ICities[];
  isLoading: boolean;
}

const CitiesTable: React.FC<CitiesTableProps> = ({ cities, isLoading }) => {
  const navigate = useNavigate();

  const handleRowClick = (city: ICities) => {
    const weatherUrl = `/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}`;
    navigate(weatherUrl);
  };

  return (
    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='inline-block min-w-full py-4 sm:px-6 lg:px-8'>
        <div className='overflow-hidden shadow rounded-lg'>
          {cities.length === 0 && !isLoading ? (
            <h1 className='text-center text-xl font-medium'>No results found</h1>
          ) : (
            <table className='min-w-full leading-normal bg-white'>

              <CityTableHeader/>
              
              <tbody>
                {isLoading && (
                  <tr className='text-center text-xl font-medium'>
                    <td colSpan={8}>Loading...</td>
                  </tr>
                )}
                {cities.map((city, index) => (
                  <CityTableRow
                   index={index}
                   key={index}
                   city={city}
                   onRowClick={handleRowClick} 
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitiesTable;
