class CreatePlayerLoots < ActiveRecord::Migration[7.0]
  def change
    create_table :player_loots do |t|
      t.references :player
      t.references :loot
      t.timestamps
    end
  end
end
