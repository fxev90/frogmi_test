import { useState, useCallback, useEffect } from 'react';
import { useGetFeatures } from '../api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';

const ITEMS_PER_PAGE = 10;



const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('md');
  const [mag, setMag] = useState("");
  const { data, isLoading, error} = useGetFeatures({ mag_type: mag, page: currentPage });	

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setMag(searchTerm);
    }, 900),
    [setMag, mag]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  

  const totalPages = data.pagination.total / ITEMS_PER_PAGE;

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (event) => {
    debouncedSearch.cancel();
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };
  

  return (
    <div className="max-w-5xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Earthquake Events</h1>
      <h1 className="text-3xl font-bold mb-4">Current Page: {currentPage}</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by mag type example:md or md,ml,ms"
          value={searchQuery}
          onChange={(e) => handleInputChange(e)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      <Table className="w-full shadow-md">
        <TableCaption className="bg-gray-100 py-2 text-gray-700 font-medium">
          Earthquake Events
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Title</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Magnitude</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Mag type</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Place</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Time</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Tsunami</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Coordinates</TableHead>
            <TableHead className="px-4 py-3 bg-gray-200 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((event) => (
            <TableRow key={event.id} className="border-b border-gray-200">
              <TableCell className="px-4 py-3">{event.attributes.title}</TableCell>
              <TableCell className="px-4 py-3">{event.attributes.magnitude}</TableCell>
              <TableCell className="px-4 py-3">{event.attributes.mag_type}</TableCell>
              <TableCell className="px-4 py-3">{event.attributes.place}</TableCell>
              <TableCell className="px-4 py-3">{event.attributes.time}</TableCell>
              <TableCell className="px-4 py-3">
                {event.attributes.tsunami ? 'Yes' : 'No'}
              </TableCell>
              <TableCell className="px-4 py-3">
                {event.attributes.coordinates.longitude},{' '}
                {event.attributes.coordinates.latitude}
              </TableCell>
              <TableCell className="px-4 py-3">
                <a
                  href={event.links.external_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-600 mr-2"
                >
                  More info
                </a>
                <a
                  href={`/features/${event.id}/comments`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Comments
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`mx-1 px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;