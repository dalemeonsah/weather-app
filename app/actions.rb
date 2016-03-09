# Homepage (Root path)
configure do
  enable :cross_origin
end

get '/' do
  erb :index
end