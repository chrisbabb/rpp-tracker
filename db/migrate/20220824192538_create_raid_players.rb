class CreateRaidPlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :raid_players do |t|
      t.references :raid
      t.references :player
      t.timestamps
    end
  end
end
