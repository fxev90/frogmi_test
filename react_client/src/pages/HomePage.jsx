// HomePage.js
import { useGetFeatures } from '../api';

const HomePage = () => {
  const { data, isLoading, error } = useGetFeatures({ magType: '' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Earthquake Events</h1>
      {data.data.map((event) => (
        <div key={event.id}>
          <h2>{event.attributes.title}</h2>
          <p>Magnitude: {event.attributes.magnitude}</p>
          <p>Place: {event.attributes.place}</p>
          <p>Time: {event.attributes.time}</p>
          <p>Tsunami: {event.attributes.tsunami ? 'Yes' : 'No'}</p>
          <p>
            Coordinates: {event.attributes.coordinates.longitude},{' '}
            {event.attributes.coordinates.latitude}
          </p>
          <a href={event.links.external_url} target="_blank" rel="noreferrer">
            More info
          </a>
          <a href={`/features/${event.id}/comments`}>View Comments</a>
        </div>
      ))}
    </div>
  );
};

export default HomePage;