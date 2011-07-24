require 'rubygems'
require 'rake'
# require 'fileutils'

desc "Create new .env file"
task :create_env_file do
  # determine current branch from git
  # see: http://stackoverflow.com/questions/1593051/how-to-programmatically-determine-the-current-checked-out-git-branch
  branch = `git name-rev --name-only HEAD`
  branch.strip!
  # alternatively one could also ask for the branch name
  # puts "Which branch?"
  # branch = STDIN.gets.chomp
  
  # github user and repository name are hardcoded
  base_path = "https://raw.github.com/spier/yql-tables/#{branch}/"
  env_filename = "alltables_forked.env"
  env_fh = File.open(env_filename,"w")
  
  # write all .xml files to .env file
  xml_files = Dir.glob("**/*.xml")
  xml_files.each do |filename| 
    table_name = File.basename(filename,".xml")
    absolute_url = File.join(base_path,filename)
    use_statement = "USE '#{absolute_url}' AS #{table_name};"
    env_fh.puts use_statement
  end
  
  env_fh.close()
  puts "Wrote new file #{env_filename}. Total of #{xml_files.size} YQL open data tables."
end

task :default => :create_env_file
