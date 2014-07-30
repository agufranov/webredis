express = require "express"
redis = require "redis"
async = require "async"

client = redis.createClient()

app = express()
app.listen 9009

app.set "views", "./src/views"
app.set "view engine", "jade"

app.use express.static "#{__dirname}/public"

app.get "/", (req, res) ->
  res.render "index"

app.get "/records", (req, res) ->
  client.keys "*", (err, keys) ->
    async.parallel (
      (
        (
          (key) ->
            (cb) ->
              client.type key, (err, type) ->
                switch type
                  when "string"
                    client.get key, (err, value) ->
                      cb err, key: key, type: type, value: value
                  when "hash"
                    client.hgetall key, (err, values) ->
                      cb err, key: key, type: type, value: values
                  else
                    cb err, key: key, type: "#{type} [unknown]", value: null
        )(_key)
      ) for _key in keys),
      (err, results) ->
        res.json results
