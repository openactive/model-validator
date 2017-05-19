require 'open-uri'

module OpenActive
  class ValidatorApp < Sinatra::Base
    
    configure do |app|      
      set :views, settings.root + '/../views' 
      set :public_folder, settings.root + '/../static' 
    end
      
    get "/" do
      erb :index
    end  
                    
    not_found do
      'Not Found'
    end 
    
    get "/schema" do
      content_type "application/json"
      {
      }.to_json      
    end

  end
end