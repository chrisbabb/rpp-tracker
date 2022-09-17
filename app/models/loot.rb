class Loot < ApplicationRecord
  has_many :player_loots
  has_many :players, through: :player_loots
  has_many :event_loots
  has_many :events, through: :event_loots
end
