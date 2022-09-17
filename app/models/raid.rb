class Raid < ApplicationRecord
  has_many :raid_events
  has_many :events, through: :raid_events
  has_many :raid_players
  has_many :players, through: :raid_players
  has_many :raid_loots
  has_many :loots, through: :raid_loots
end
