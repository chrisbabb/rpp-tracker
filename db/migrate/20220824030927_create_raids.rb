class CreateRaids < ActiveRecord::Migration[7.0]
  def change
    create_table :raids do |t|
      t.integer :points
      t.integer :start_time
      t.integer :end_time
      t.integer :bonus
      t.timestamps
    end
  end
end
