class Team < ActiveRecord::Base
  attr_accessible :date, :user_id, :points, :name, :game, :game_id

  has_many :athletes_teams
  has_many :athletes, :through => :athletes_teams
  belongs_to :user
  belongs_to :game

  delegate :name, :to => :user, :prefix => true, :allow_nil => true

  accepts_nested_attributes_for :athletes

  before_create :set_date
  after_create :create_game_if_not_present!
  validate :athletes, :length => {:is => 5, :message => "Must have 5 athletes per team"}#, :on => :create
  validate :must_have_5_unique_positions

  scope :all_user_teams, lambda { |user| where("user_id = ?", user.id).order("created_at DESC") }

  # REVIEW: separate methods into private and public

  def athlete_ids=(athlete_ids)
    self.athletes += Athlete.find_all_by_id(athlete_ids)
  end

  def total_fantasy_points
    # REVIEW: use inject/reduce
    total_points = 0
    self.athletes.each do |athlete|
      total_points += athlete.fantasy_points
    end
    total_points

    # Refactored ...
    # athletes.map(&:fantasy_points).inject(&:+)
  end

  def calculate_fantasy_points
    self.athletes.each do |athlete|
      athlete.find_stats(self.id)
    end
    total_fantasy_points
  end

  def create_game_if_not_present!
    # REVIEW: don't call save if no changes made
    unless self.game.present?
      self.build_game
      self.save
    end
  end

  def must_have_5_unique_positions
    positions = self.athletes.map(&:position)
    if positions.uniq.length != positions.length
      errors.add(:team, "must have a Point Guard, Center, Shooting Guard, Power Forward, and Small Forward")
    end
  end

  def set_date
    self.date = (Time.now.utc + Time.zone_offset('EST')).to_date
  end

  def name=(new_name)
    new_name = "Team_#{date}" if new_name.blank?
    super(new_name)
  end

  # helper_method :total_fantasy_points


end
