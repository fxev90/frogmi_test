require 'test_helper'
require 'webmock/minitest'
require 'net/http'
require 'json'
require 'rake'

class EarthquakeDataTasksTest < ActiveSupport::TestCase
  test 'fetch_and_persist task' do
    Rails.application.load_tasks
    # Stub the USGS API response
    stub_request(:get, 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
      .to_return(status: 200, body: sample_earthquake_data, headers: {})

    # Call the task
    Rake::Task['earthquake_data:fetch_and_persist'].invoke

    # Assert that the data was persisted correctly
    assert_equal 2, Earthquake.count

    event1 = Earthquake.find_by(external_id: 'event1')
    assert_equal 6.5, event1.magnitude
    assert_equal 'Offshore Northern California', event1.place

    assert_equal 'https://earthquake.usgs.gov/earthquakes/eventpage/event1', event1.url
    assert_equal false, event1.tsunami
    assert_equal 'md', event1.mag_type
    assert_equal 'Magnitude 6.5 - Offshore Northern California', event1.title
    assert_equal -123.5, event1.longitude
    assert_equal 40.2, event1.latitude

    event2 = Earthquake.find_by(external_id: 'event2')
    assert_equal 4.2, event2.magnitude
    assert_equal 'Somewhere in California', event2.place

    assert_equal 'https://earthquake.usgs.gov/earthquakes/eventpage/event2', event2.url
    assert_equal true, event2.tsunami
    assert_equal 'ml', event2.mag_type
    assert_equal 'Magnitude 4.2 - Somewhere in California', event2.title
    assert_equal -118.7, event2.longitude
    assert_equal 34.1, event2.latitude
  end

  private

  def sample_earthquake_data
    <<~JSON
      {
        "type": "FeatureCollection",
        "metadata": {
          "generated": 1680201600000,
          "url": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
          "title": "USGS All Earthquakes, Past Month"
        },
        "features": [
          {
            "type": "Feature",
            "properties": {
              "mag": 6.5,
              "place": "Offshore Northern California",
              "time": 1680201600000,
              "updated": 1680201600000,
              "tz": null,
              "url": "https://earthquake.usgs.gov/earthquakes/eventpage/event1",
              "detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/event1.geojson",
              "felt": null,
              "cdi": null,
              "mmi": null,
              "alert": null,
              "status": "automatic",
              "tsunami": 0,
              "sig": 670,
              "net": "us",
              "code": "event1",
              "ids": ",us1234567,",
              "sources": ",us,",
              "types": ",origin,phase-data,",
              "nst": null,
              "dmin": null,
              "rms": 0.54,
              "gap": null,
              "magType": "md",
              "type": "earthquake",
              "title": "Magnitude 6.5 - Offshore Northern California"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-123.5, 40.2]
            },
            "id": "event1"
          },
          {
            "type": "Feature",
            "properties": {
              "mag": 4.2,
              "place": "Somewhere in California",
              "time": 1680288000000,
              "updated": 1680288000000,
              "tz": null,
              "url": "https://earthquake.usgs.gov/earthquakes/eventpage/event2",
              "detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/event2.geojson",
              "felt": null,
              "cdi": null,
              "mmi": null,
              "alert": null,
              "status": "automatic",
              "tsunami": 1,
              "sig": 301,
              "net": "us",
              "code": "event2",
              "ids": ",us7654321,",
              "sources": ",us,",
              "types": ",origin,phase-data,",
              "nst": null,
              "dmin": null,
              "rms": 0.34,
              "gap": null,
              "magType": "ml",
              "type": "earthquake",
              "title": "Magnitude 4.2 - Somewhere in California"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-118.7, 34.1]
            },
            "id": "event2"
          }
        ]
      }
    JSON
  end
end
