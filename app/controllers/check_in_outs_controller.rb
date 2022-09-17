class CheckInOutsController < ApplicationController

    def index
        render json: CheckInOut.all
    end

end