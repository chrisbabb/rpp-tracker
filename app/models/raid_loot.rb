class RaidLoot < ApplicationRecord
  belongs_to :raid
  belongs_to :loot
end
