module Utilities
  def active_link(*args, &block)

    # Check for block
    url_idx = block_given? ? 0 : 1
    options_idx = block_given? ? 1 : 2

    # Get the url
    page = current_page.url

    # Set the url
    url = args[url_idx]

    # Get the parent url
    unless page == "/" || page == ""
      parent_url = "/" + page.to_s.split("/")[1] + "/"
    end

    options = args[options_idx] || {}
    options[:class] ||= ""

    if url == page
      options[:class] << " active"
      args[options_idx] = options
    elsif parent_url == "/arrows/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    elsif parent_url == "/currency/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    elsif parent_url == "/letters/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    elsif parent_url == "/math/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    elsif parent_url == "/numbers/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    elsif parent_url == "/punctuation/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    elsif parent_url == "/symbols/"
      if url == parent_url
        options[:class] << " active"
        args[options_idx] = options
      end
    end

    link_to(*args, &block)
  end
end