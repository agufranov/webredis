(function() {
  var app, async, client, express, redis;

  express = require("express");

  redis = require("redis");

  async = require("async");

  client = redis.createClient();

  app = express();

  app.listen(9009);

  app.set("views", "./src/views");

  app.set("view engine", "jade");

  app.use(express["static"]("" + __dirname + "/public"));

  app.get("/", function(req, res) {
    return res.render("index");
  });

  app.get("/records", function(req, res) {
    return client.keys("*", function(err, keys) {
      var _key;
      return async.parallel((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          _key = keys[_i];
          _results.push((function(key) {
            return function(cb) {
              return client.type(key, function(err, type) {
                switch (type) {
                  case "string":
                    return client.get(key, function(err, value) {
                      return cb(err, {
                        key: key,
                        type: type,
                        value: value
                      });
                    });
                  case "hash":
                    return client.hgetall(key, function(err, values) {
                      return cb(err, {
                        key: key,
                        type: type,
                        value: values
                      });
                    });
                  default:
                    return cb(err, {
                      key: key,
                      type: "" + type + " [unknown]",
                      value: null
                    });
                }
              });
            };
          })(_key));
        }
        return _results;
      })(), function(err, results) {
        return res.json(results);
      });
    });
  });

}).call(this);
