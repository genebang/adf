class UsersController < ApplicationController
  def index
    # @users = User.joins(:teams => :user).order("teams.points DESC")
    @users = User.yesterdays_top_points(Date.today - 1 ) #SCOTT TEST THIS PLEASE!
    # REVIEW: needs better naming
    # @todays_leaders = Users.leaders_for_day(Date.today)

    @teams = Team.order('points DESC').where("date = ?", (Date.today-1))
    # REVIEW: use a scope
    # Team.for_today
  end

  def show
    @user = current_user
  end

end

