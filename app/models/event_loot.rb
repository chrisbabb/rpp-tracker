class EventLoot < ApplicationRecord
  belongs_to :event
  belongs_to :loot
end
