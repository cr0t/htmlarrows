gem "aws-sdk", "=2.0.31"
require "rubygems"
require "aws-sdk"
require "fileutils"
require "httparty"
require "json"

data = JSON.load(File.read("keys.json"))

# vars stored in keys.json (gitignored)
aws_access_key = data["aws_access_key"]
aws_secret_key = data["aws_secret_key"]
aws_queue_url = data["aws_queue_url"]
aws_cf_key = data["aws_cf_key"]
aws_region = data["aws_region"]
api_key = data["api_key"]
api_ver = data["api_ver"]
website = data["website"]
bucket = data["bucket"]

desc "build static pages"
task :build do
  puts "[INIT] >>>> Compiling static pages"
  system "middleman build > sync.txt"
end

desc "copy new gzipped files and clean the directory"
task :gzip do
  puts "[INIT] >>>> Copying gzipped files"

  uploads = []
  deletes = []

  changes = ["create  build/", "update  build/"]
  removes = ["remove  build/"]

  File.readlines("sync.txt").each do |line|
    if changes.any? { |change| line.include? change }
      item = line.split("build/").last.strip
      uploads << item.to_s
    elsif removes.any? { |remove| line.include? remove }
      unless line.include? ".gz"
        item = line.split("build/").last.strip
        deletes << item.to_s
      end
    end
  end

  uploads.each do |file|
    path = "gzip/" + File.dirname(file)
    gz = file + ".gz"

    exts = [".css", ".js", ".html", ".htm", ".xml", ".txt"]

    unless File.directory?(path)
      FileUtils.mkdir_p("gzip/" + File.dirname(file))
    end

    if exts.include? File.extname(file)
      FileUtils.cp("build/#{gz}", "#{path}/#{File.basename(file)}")
    else
      FileUtils.cp("build/#{file}", "#{path}/#{File.basename(file)}")
    end
  end

  deletes.each do |file|
    FileUtils.rm_rf("gzip/" + file)
  end
end

desc "sync with s3 bucket"
task :sync do
  puts "[INIT] >>>> Syncing with S3"

  # sync css / js files
  system "aws --profile=zeppelin_deploy s3 sync gzip/ s3://#{bucket}/ --acl=public-read --delete --cache-control='max-age=2629000' --content-encoding='gzip' --exclude '*' --include '*.css' --include '*.js'"

  # sync html / xml files
  system "aws --profile=zeppelin_deploy s3 sync gzip/ s3://#{bucket}/ --acl=public-read --delete --cache-control='max-age=0, no-cache' --content-encoding='gzip' --exclude '*' --include '*.html' --include '*.xml' --include '*.txt'"
end

desc "pull, build, gzip and sync"
task :deploy do
  Rake::Task["build"].invoke
  Rake::Task["gzip"].invoke
  Rake::Task["sync"].invoke
end