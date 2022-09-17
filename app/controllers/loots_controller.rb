class LootsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :loot_not_found

    def index
        render json: Loot.all
    end

    def show
        render json: Loot.find(params[:id]), serializer: AddEventToLootSerializer
    end

    def create
        loot = Loot.create!(legal_params)
        render json: loot, status: :created
    end

    def destroy
        Loot.find(params[:id]).destroy
        head :ok
    end

    private

    def legal_params
        params.permit(:name, :points)
    end

    def loot_not_found
        render json: {error: "Loot not found"}, status: :not_found
    end

end