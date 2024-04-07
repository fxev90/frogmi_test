class Comment < ApplicationRecord
    belongs_to :earthquake
    validates :body, presence: true
end