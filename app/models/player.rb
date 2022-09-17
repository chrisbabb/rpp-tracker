class Player < ApplicationRecord
  has_many :raid_players
  has_many :raids, through: :raid_players
  has_many :player_loots
  has_many :loots, through: :player_loots
  has_many :check_in_outs
end
