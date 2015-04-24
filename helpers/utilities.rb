module Utilities
  def active_link(name, url, options = {})
	  options[:class] ||= ""
	  options[:class] << " active" if url == current_page.url
	  link_to(name, url, options)
	end
end