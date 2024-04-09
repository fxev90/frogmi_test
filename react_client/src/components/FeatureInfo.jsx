

const FeatureInfo = ({ feature }) => {
    return (
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-lg font-medium mb-2">{feature.title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Magnitude:</p>
            <p>{feature.attributes.magnitude}</p>
          </div>
          <div>
            <p className="font-medium">Place:</p>
            <p>{feature.attributes.place}</p>
          </div>
          <div>
            <p className="font-medium">Time:</p>
            <p>{new Date(feature.attributes.time).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-medium">Coordinates:</p>
            <p>
              Latitude: {feature.attributes.coordinates.latitude}, Longitude:{' '}
              {feature.attributes.coordinates.longitude}
            </p>
          </div>
        </div>
      </div>
    );
  };

export default FeatureInfo