var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res, next) {
   Message.find()
       .exec(function(err, messages){
           if (err) {
               return res.status(500).json({
                   title: 'an error occurred',
                   error: err
               });
           }
           res.status(200).json({
               message: 'Success',
               obj: messages
           })
       });
});

router.post('/', function(req, res, next) {
    console.log("content:", req.body);

    var message = new Message({
        content: req.body.content
    });
    message.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'an error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'saved message',
            obj: result
        });
    });
});

router.patch('/:id', function(req, res, next) {
   Message.findById(req.params.id, function(err, message) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!message) {
          return res.status(500).json({
              title: 'No message found',
              error: { message: 'Message not found!'}
          });
      }
      message.content = req.body.content;
      message.save(function(err, result) {
          if (err) {
              return res.status(500).json({
                  title: 'an error occurred',
                  error: err
              });
          }
          res.status(201).json({
              message: 'updated message',
              obj: result
          });
      });
   });
});

router.delete('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No message found',
                error: { message: 'Message not found!'}
            });
        }
        message.content = req.body.content;
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'an error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'deleted message',
                obj: result
            });
        });
    });
})

module.exports = router;