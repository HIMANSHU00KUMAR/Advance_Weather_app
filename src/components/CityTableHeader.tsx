
const CityTableHeader: React.FC = () => {
    return (
      <thead className='text-left text-xs font-medium uppercase tracking-wider bg-gray-50 border-t border-b border-gray-200'>
        <tr>
          <th className='px-6 py-3'>SNO</th>
          <th className='px-6 py-3'>geoname_id</th>
          <th className='px-6 py-3'>City Name</th>
          <th className='px-6 py-3'>Country Name</th>
          <th className='px-6 py-3'>ASCII Name</th>
          <th className='px-6 py-3'>Population</th>
          <th className='px-6 py-3'>Timezone</th>
          <th className='px-6 py-3'>Coordinates</th>
        </tr>
      </thead>
    );
};

export default CityTableHeader