xml.instruct!
xml.urlset 'xmlns' => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.select { |page| page.path =~ /\.html/ && !page.data.noindex == true }.each do |page|
    xml.url do
      xml.loc "http://htmlarrows.com#{page.url}"
      xml.lastmod Date.today.to_time.iso8601
      xml.changefreq page.data.changefreq || "weekly"
      xml.priority page.data.priority || "0.7"
    end
  end
end