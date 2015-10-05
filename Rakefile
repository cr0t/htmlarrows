require "rubygems"
require "aws-sdk"
require "fileutils"
require "httparty"
require "json"

data = JSON.load(File.read("keys.json"))

# vars stored in keys.json (gitignored)
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

      # copy files with the .gz extension
      FileUtils.cp("build/#{gz}", "#{path}/#{File.basename(file)}")

      # create redirect object for html files
      if File.extname(file) == ".html"
        File.new(path + ".redirect", "w")
      end
    else
      FileUtils.cp("build/#{file}", "#{path}/#{File.basename(file)}")
    end
  end

  deletes.each do |file|
    FileUtils.rm_rf("gzip/" + file)
    if File.extname(file) == ".html"
      FileUtils.rm_rf("gzip/" + File.dirname(file) + ".redirect")
    end
  end
end

desc "sync with s3 bucket"
task :sync do
  puts "[INIT] >>>> Syncing with S3"

  # sync css / js files
  system "aws --profile=zeppelin_deploy s3 sync gzip/ s3://#{bucket}/ --acl=public-read --delete --cache-control='max-age=2629000' --content-encoding='gzip' --exclude '*' --include '*.css' --include '*.js'"

  # sync html / xml files
  system "aws --profile=zeppelin_deploy s3 sync gzip/ s3://#{bucket}/ --acl=public-read --delete --cache-control='max-age=0, no-cache' --content-encoding='gzip' --exclude '*' --include '*.html' --include '*.xml' --include '*.txt'"

  # sync image files
  system "aws --profile=zeppelin_deploy s3 sync gzip/ s3://#{bucket}/ --acl=public-read --delete --cache-control='max-age=2629000' --exclude '*' --include 'assets/images/*' --exclude 'assets/images/*.ico' --include '*.json'"

  # sync redirect files
  # system "aws --profile=zeppelin_deploy s3 sync gzip/ s3://#{bucket}/ --acl=public-read --delete --exclude '*' --include '*.redirect'"

end

desc "sync redirect files and rename them on s3"
task :rename do
  puts "[INIT] >>>> Renaming redirects with S3"

  # rename redirect files
  Dir.glob("gzip/**/*.redirect").each do |file|

    gzip = File.dirname(file)
    sub = gzip.split("gzip").last
    path = "/" + File.basename(file).split(".redirect").first + "/"
    name = File.basename(file)
    new_name = name.split(".redirect").first
    redirect = (sub == nil) ? "#{name}" : "#{sub}/#{name}"
    rename = (sub == nil) ? "#{new_name}" : "#{sub}/#{new_name}"

    # rename redirect files
    system "aws --profile=zeppelin_deploy s3 mv s3://#{bucket}#{redirect} s3://#{bucket}#{rename} --acl=public-read --website-redirect='#{path}' --content-type='text/html'"

  end
end

desc "pull, build, gzip and sync"
task :deploy do
  Rake::Task["build"].invoke
  Rake::Task["gzip"].invoke
  Rake::Task["sync"].invoke
  # Rake::Task["rename"].invoke
end