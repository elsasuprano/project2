const router = require('express').Router();
const sequelize = require('../config/connection');
const { Watch, User, Likes, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all Watches for availability.handlebars
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Watch.findAll({
        where: {
          user_id: req.session.user_id
          },
        attributes: [
            'id',
            'name',
            'model',
            'price',
            'condition',
            'location',
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE watch.id = likes.watch_id)'), 'likes_count']
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'watch_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })

      // Render for availability.handlebars
        .then(dbWatchData => {
          const watches = dbWatchData.map(watch => watch.get({ plain: true }));
          res.render('availability', {
            watches, 
            loggedIn: true
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });

// GET Watch by ID - watch-container.handlebars
router.get('/watch/:id', (req, res) => {
    Watch.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'model',
        'price',
        'condition',
        'location',
        'user_id',
        [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE watch.id = likes.watch_id)'), 'likes_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'watch_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbWatchData => {
        if (!dbWatchData) {
          res.status(404).json({ message: 'Watch NOT found with this id' });
          return;
        }

        const watch = dbWatchData.get({ plain: true });

        // Render for single-watch.handlebar
        res.render('single-watch', {
            watch,
            loggedIn: req.session.loggedIn,
            isowner: watch.user_id === req.session.user_id
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

  module.exports = router;