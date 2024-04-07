
module Api
    module V1
      class EarthquakeController < ApplicationController
        def index
          events = Earthquake.all
          events = events.where(mag_type: params[:filters][:mag_type]) if params[:filters].present? && params[:filters][:mag_type].present?
          per_page = (params[:per_page] || 10).to_i
          per_page = 1000 if per_page > 1000
          events = events.page(params[:page]).per(per_page)
  
          render json: {
            data: events.map { |event| earthquake_event_json(event) },
            pagination: {
              current_page: events.current_page,
              total: events.total_count,
              per_page: events.limit_value
            }
          }
        end
  
        private
  
        def earthquake_event_json(event)
          {
            id: event.id,
            type: 'feature',
            attributes: {
              external_id: event.external_id,
              magnitude: event.magnitude.to_f,
              place: event.place,
              time: event.time,
              tsunami: event.tsunami,
              mag_type: event.mag_type,
              title: event.title,
              coordinates: {
                longitude: event.longitude.to_f,
                latitude: event.latitude.to_f
              }
            },
            links: {
              external_url: event.url
            }
          }
        end
      end
    end
  end
