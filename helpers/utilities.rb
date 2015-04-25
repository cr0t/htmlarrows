module Utilities
  def active_link(*args, &block)

    # Check for block
    url_idx = block_given? ? 0 : 1
    options_idx = block_given? ? 1 : 2

    # Get the url
    page = current_page.url

    # Set the url
    url = args[url_idx]

    options = args[options_idx] || {}
    options[:class] ||= ""

    if url == page
      options[:class] << " active"
      args[options_idx] = options
    end

    link_to(*args, &block)
  end
end