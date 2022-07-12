const router = require('express').Router();
const sequelize = require('../config/connection');
const { Watch, User, Likes, Comment } = require('../models');


// Get all Watches render homepage
router.get('/', (req, res) => {
    Watch.findAll({
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
      .then(dbWatchData => {
        const watches = dbWatchData.map(watch => watch.get({ plain: true }));
        res.render('homepage', {
            watches,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Login Route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
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
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  module.exports = router;