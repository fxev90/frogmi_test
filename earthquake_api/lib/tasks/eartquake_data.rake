namespace :earthquake_data do
    desc "Fetch and persist earthquake data"
    task fetch_and_persist: :environment do
      require 'net/http'
      require 'json'
  
      url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
      uri = URI(url)
      response = Net::HTTP.get(uri)
      data = JSON.parse(response)
  
      data['features'].each do |feature|
        next if feature['properties']['title'].blank? || feature['properties']['url'].blank? || feature['properties']['place'].blank? || feature['properties']['magType'].blank? || feature['geometry']['coordinates'].blank?
  
        begin
          event = Earthquake.find_or_initialize_by(external_id: feature['id'])
          event.magnitude = feature['properties']['mag']
          event.place = feature['properties']['place']
          event.time = Time.at(feature['properties']['time'] / 1000).strftime('%Y-%m-%d %H:%M:%S')
          event.url = feature['properties']['url']
          event.tsunami = feature['properties']['tsunami']
          event.mag_type = feature['properties']['magType']
          event.title = feature['properties']['title']
          event.longitude = feature['geometry']['coordinates'][0]
          event.latitude = feature['geometry']['coordinates'][1]
          event.save!
        rescue => e
          Rails.logger.error "Error while saving event #{feature['id']}: #{e}"
        end

      end
    end
  end