import React, { useState, useRef } from 'react';
import LocationAndTemp from './LocationandTemp'; // Assuming LocationandTemp component exists
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';


interface SearchFormProps {
  onSortChange: (sortType: string) => void;
  onSearch: (searchTerm: string, searchType: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSortChange, onSearch, setPage }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<string>('name');
  const [searchType, setSearchType] = useState<string>('name'); // Initial search type
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1); // Reset page on search
    onSearch(searchTerm, searchType);
  };

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };

  const handleSortTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
    onSortChange(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setSearchTerm(''); // Set empty string on backspace at the beginning
    } else {
      const capitalizedSearchTerm = event.target.value[0].toUpperCase() + event.target.value.substring(1).toLowerCase();
      setSearchTerm(capitalizedSearchTerm);
    }
  };

  return (
    <div className="top-bar flex flex-col md:flex-row justify-between items-center bg-gray-700 text-white p-4 md:p-6 lg:p-8 w-full">
      <LocationAndTemp />

      <Link to={'/map'} className="flex items-center">
        <FontAwesomeIcon icon={faEarthAmericas} size='lg' />
        <span className='ml-2 hover:text-blue-400'>Map</span>
      </Link>

      {/* Sorting dropdown */}
      <div className="flex items-center mt-4 md:mt-0">
        <label htmlFor="sort-type" className="mr-2 text-sm font-medium">Sort By:</label>
        <select
          id="sort-type"
          value={sortType}
          onChange={handleSortTypeChange}
          className="custom-select focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded border border-gray-300 px-3 py-2 text-gray-700 m-2"
        >
          <option value="name">City Name</option>
          <option value="cou_name_en">Country Name</option>
          <option value="ascii_name">ASCII NAME</option>
          <option value="population">POPULATION</option>
          <option value="timezone">TIMEZONE</option>
        </select>
      </div>

      {/* Search form */}
      <form className="search-form flex items-center flex-grow mt-4 md:mt-0 max-w-md md:max-w-lg rounded-md overflow-hidden" onSubmit={handleSubmit}>
        <label htmlFor="search-type" className="mr-2 text-sm font-medium">Search By:</label>
        <select
          id="search-type"
          value={searchType}
          onChange={handleSearchTypeChange}
          className="custom-select focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded border border-gray-300 px-3 py-2 text-gray-700 m-2"
        >
          <option value="name">City Name</option>
          <option value="cou_name_en">Country Name</option>
        </select>
        <input
          className="search-input p-2 w-full text-black rounded-l-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-r-md border border-gray-300 px-3 py-2 m-2 capitalize"
          type="text"
          id="search-input"
          placeholder="Enter city/country name"
          value={searchTerm}
          onChange={handleInputChange}
          ref={inputRef}
          aria-label="Search for city or country by name"
          autoCapitalize="sentences"
        />
        <button type="submit" className="search-button py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md">
          Search
        </button>
      </form>
    </div>

  );
};

export default SearchForm;
