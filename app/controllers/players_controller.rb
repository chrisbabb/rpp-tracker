class PlayersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :player_not_found

    def index
        render json: Player.all
    end

    def show
        render json: Player.find(params[:id])
    end

    def create
        player = Player.create!(legal_params)
        render json: player, status: :created
    end

    def destroy
        Player.find(params[:id]).destroy
        head :ok
    end

    private

    def legal_params
        params.permit(:name, :status)
    end

    def player_not_found
        render json: {error: "Player not found"}, status: :not_found
    end

end