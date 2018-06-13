class AlphavantageApi
    include HTTParty
   
    base_uri "https://www.alphavantage.co/query"
   
    attr_accessor :function, :symbol, :apikey
   
    # initialize with the api key
    def initialize()
      self.apikey = Rails.application.credentials.alpha_api_key
    end
    
    # Function to obtain the daily stats for 100 days for the sybol stock
    def timeSeriesDaily(symbol)
        response = self.class.get("?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=#{self.apikey}")

      if response.success?
        response
      else
        raise response.response
      end
    end

end
