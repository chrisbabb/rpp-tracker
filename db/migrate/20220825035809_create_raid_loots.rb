class CreateRaidLoots < ActiveRecord::Migration[7.0]
  def change
    create_table :raid_loots do |t|
      t.references :raid
      t.references :loot

      t.timestamps
    end
  end
end
