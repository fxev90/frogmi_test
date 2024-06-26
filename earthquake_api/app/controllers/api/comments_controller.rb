# app/controllers/api/v1/comments_controller.rb
module Api
      class CommentsController < ApplicationController
        def create
          event = Earthquake.find(params[:feature_id])
          comment = event.comments.build(comment_params)
          if comment.save
            render json: comment, status: :created
          else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        private
  
        def comment_params
          params.permit(:body)
        end
      end
  end
  