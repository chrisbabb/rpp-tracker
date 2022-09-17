class RaidsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :raid_not_found

    def index
        render json: Raid.all
    end

    def show
        render json: Raid.find(params[:id]), serializer: AddPlayersAndEventsAndLootsToRaidSerializer
    end

    def create
        raid = Raid.create!(legal_params)
        render json: raid, status: :created
    end

    def destroy
        Raid.find(params[:id]).destroy
        head :ok
    end

    private

    def legal_params
        params.permit(:points, :start_time, :end_time, :bonus)
    end

    def raid_not_found
        render json: {error: "Raid not found"}, status: :not_found
    end

end