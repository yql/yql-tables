# 
# A couple of rake tasks to make the creation of YQL tables easier.
# This caters specifically to my setup, as I am hosting my YQL tables at github.com
# 
# Author: Sebastian Spier (http://twitter.com/#!/sebastianspier/)
# 

require 'rubygems'
require 'rake'
require 'nokogiri'
require 'open-uri'

YQL_XSD_ONLINE = "http://query.yahooapis.com/v1/schema/table.xsd"
YQL_XSD_LOCAL = "table.xsd"
GITHUB_USER = "spier"
ENV_FILENAME = "alltables_forked.env"


task :default => :create_env_file


desc "Create new .env file for use with github"
task :create_env_file do
  # determine from git, what the current branch is
  # see: http://stackoverflow.com/questions/1593051/how-to-programmatically-determine-the-current-checked-out-git-branch
  branch = `git name-rev --name-only HEAD`
  branch.strip!
  
  # parameters to this rake tasks could also be provided from the outside:
  # http://www.viget.com/extend/protip-passing-parameters-to-your-rake-tasks/
  
  # alternatively one could also ask for the branch name
  # puts "Which branch?"
  # branch = STDIN.gets.chomp
  
  # github user and repository name are hardcoded
  base_path = "https://raw.github.com/#{GITHUB_USER}/yql-tables/#{branch}/"
  env_fh = File.open(ENV_FILENAME,"w")
  
  # write one entry for each .xml files to the .env file
  xml_files = Dir.glob("**/*.xml")
  xml_files.each do |filename| 
    table_name = File.basename(filename,".xml")
    absolute_url = File.join(base_path,filename)
    use_statement = "USE '#{absolute_url}' AS #{table_name};"
    env_fh.puts use_statement
  end
  
  env_fh.close()
  puts "Wrote new file #{ENV_FILENAME}. Total of #{xml_files.size} YQL open data tables."
end


desc "Check a YQL table against the YQL XSD, call with 'rake check file=abc'"
task :check do
  filename = ENV['file']
  xsd = Nokogiri::XML::Schema(open(YQL_XSD_LOCAL).read)
  doc = Nokogiri::XML(open(filename).read)
  puts "Is the YQL definition '#{filename}' valid? => #{xsd.valid?(doc)}"
  
  xsd.validate(doc).each do |error|
    puts error.message
  end
end
