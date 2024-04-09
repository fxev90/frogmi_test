
module Api
  class FeaturesController < ApplicationController
    def index
      events = Earthquake.all
      if params[:filters].present? && params[:filters][:mag_type].present?
        mag_types = params[:filters][:mag_type].split(',')
        events = events.where(mag_type: mag_types)
      end
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

    def show
      earthquake = Earthquake.includes(:comments).find(params[:id])
      render json: {
        data: earthquake_event_json(earthquake),
        included: earthquake.comments.map { |comment| comment_json(comment) }
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

    def comment_json(comment)
      {
        id: comment.id,
        type: 'comment',
        attributes: {
          body: comment.body,
          created_at: comment.created_at,
          updated_at: comment.updated_at
        }
      }
    end
  end
end
