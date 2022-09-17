class RaidPlayer < ApplicationRecord
  belongs_to :raid
  belongs_to :player
end
