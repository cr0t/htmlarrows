require "builder"
require 'json'


#### DATA

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# data.website.marbling.each do |paper|
#   proxy "/marbling/#{paper["slug"]}.html", "/marbling/template.html", :locals => { :paper => paper }, :ignore => true
# end

# data.website.suminagashi.each do |paper|
#   proxy "/suminagashi/#{paper["slug"]}.html", "/suminagashi/template.html", :locals => { :paper => paper }, :ignore => true
# end



#### SITEMAP

# Sitemap generation
page "/sitemap.xml", layout: false


#### GLOBAL CONFIGURATION

# Pretty URLs
activate :directory_indexes

# Enable autoprefixing on CSS
activate :autoprefixer do |config|
  config.ignore   = ['normalize.scss']
end

# Define asset paths
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'


#### DEVELOPMENT CONFIGURATION

configure :development do
  # Reload the browser automatically whenever files change
  activate :livereload
end



#### PRODUCTION CONFIGURATION

configure :build do

  # Enable cache buster
  activate :asset_hash

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # GZIP files for even better compression
  activate :gzip, exts: %w(.js .css .html .htm .xml .txt)

  # Ignore DS_Store file
  ignore ".DS_Store"
end