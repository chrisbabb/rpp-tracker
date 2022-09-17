class EventsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :event_not_found

    def index
        render json: Event.all
    end

    def show
        render json: Event.find(params[:id]), serializer: AddLootToEventSerializer
    end

    def create
        event = Event.create!(legal_params)
        render json: event, status: :created
    end

    def destroy
        Event.find(params[:id]).destroy
        head :ok
    end

    private

    def legal_params
        params.permit(:name)
    end

    def event_not_found
        render json: {error: "Event not found"}, status: :not_found
    end

end