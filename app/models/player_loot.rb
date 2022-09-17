class PlayerLoot < ApplicationRecord
  belongs_to :player
  belongs_to :loot
end
