class Comment < ApplicationRecord
    belongs_to :earthquake, foreign_key: 'earthquakes_id'
    validates :body, presence: true
end