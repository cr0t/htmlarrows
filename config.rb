require "builder"
require 'json'


#### DATA

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
data.arrows.entities.each do |entity|
  proxy "/arrows/#{entity["slug"]}.html", "/arrows/template.html", :locals => { :entity => entity }, :ignore => true
end

data.currency.entities.each do |entity|
  proxy "/currency/#{entity["slug"]}.html", "/currency/template.html", :locals => { :entity => entity }, :ignore => true
end

data.letters.entities.each do |entity|
  proxy "/letters/#{entity["slug"]}.html", "/letters/template.html", :locals => { :entity => entity }, :ignore => true
end

data.math.entities.each do |entity|
  proxy "/math/#{entity["slug"]}.html", "/math/template.html", :locals => { :entity => entity }, :ignore => true
end

data.numbers.entities.each do |entity|
  proxy "/numbers/#{entity["slug"]}.html", "/numbers/template.html", :locals => { :entity => entity }, :ignore => true
end

data.punctuation.entities.each do |entity|
  proxy "/punctuation/#{entity["slug"]}.html", "/punctuation/template.html", :locals => { :entity => entity }, :ignore => true
end

data.symbols.entities.each do |entity|
  proxy "/symbols/#{entity["slug"]}.html", "/symbols/template.html", :locals => { :entity => entity }, :ignore => true
end



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