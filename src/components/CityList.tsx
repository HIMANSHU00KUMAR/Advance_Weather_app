import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ICities } from '../interfaces/city';
import CitiesTable from './CitiesTable';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchForm from './SearchForm';

const CityList: React.FC = () => {

  const [sortType, setSortType] = useState<string>('name')
  const [searchType, setSearchType] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [prevSearchTerm, setPrevSearchTerm] = useState<string>('');
  const [cities, setCities] = useState<ICities[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_CITY_BASE_URL;

  const fetchCities = useCallback(async (searchTerm: string, searchType: string, sortType: string, page: number) => {

    console.log(`Fetching data for: ${searchTerm}, Sort: ${sortType}, Page: ${page}`);

    setIsLoading(true);
    try {
      const limit = 25;
      const offset = (page - 1) * limit;
      const url = `${baseUrl}${searchTerm ? `where=${searchType}%3D'${searchTerm}'` : ''}&limit=${limit}&offset=${offset}&order_by=${sortType}`;

      console.log(url);

      const response = await axios.get(url);
      const newCities = response.data.results;
      const data: ICities[] = newCities
      if (searchTerm !== prevSearchTerm && newCities.length === limit) {
        setPrevSearchTerm(searchTerm);
        setCities(data);
        setHasMore(newCities.length === limit);
      } else {
        setCities((prevCities) => [...prevCities, ...data]);
        setHasMore(newCities.length === limit);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, prevSearchTerm]);

  useEffect(() => {
    if (initialFetchCompleted) {
      fetchCities(searchTerm, searchType, sortType, page);
    } else {
      setInitialFetchCompleted(true);
    }
  }, [searchTerm, searchType, sortType, fetchCities, page, initialFetchCompleted]);



  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (newSearchTerm: string, newSearchType: string) => {

    setSearchTerm(newSearchTerm);
    setSearchType(newSearchType);
    // setSortType(newSortType);
    setPage(1);
    setCities([]);
    console.log("srchname = " + searchTerm + "sortype = " + sortType + "searchtype = " + searchType);
  };

  const handleSort = (newSortType: string) => {
    setSortType(newSortType);
    setPage(1);
    setCities([]);
  }

  return (
    <main>
      <header>
        <SearchForm onSortChange={handleSort} onSearch={handleSearch} setPage={setPage} />
      </header>
      <section>
        <InfiniteScroll
          dataLength={cities.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
        >
          <CitiesTable cities={cities} isLoading={isLoading} />
        </InfiniteScroll>
      </section>
    </main>
  );
};

export default CityList;