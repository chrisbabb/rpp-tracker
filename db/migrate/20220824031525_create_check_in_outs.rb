class CreateCheckInOuts < ActiveRecord::Migration[7.0]
  def change
    create_table :check_in_outs do |t|
      t.integer :time
      t.integer :raid_id
      t.integer :player_id
      t.string :in_or_out
      t.timestamps
    end
  end
end
