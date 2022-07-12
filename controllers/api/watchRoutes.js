const router = require('express').Router();
const { User, Watch, Comment, Likes } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET all Watches
router.get('/', (req, res) => {
    Watch.findAll({
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
            },
          ]
    })
      .then(dbWatchData => res.json(dbWatchData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// GET Watch by ID
router.get('/:id', (req, res) => {
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
                model: User,
                attributes: ['username']
              },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'watch_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            }
          ]

    })
      .then(dbWatchData => {
        if (!dbWatchData) {
          res.status(404).json({ message: 'Watch NOT found with this id' });
          return;
        }
        res.json(dbWatchData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// POST Watch
router.post('/', withAuth, (req, res) => {
    Watch.create({
      name: req.body.name,
      model: req.body.model,
      price: req.body.price,
      condition: req.body.condition,
      location: req.body.location,
      user_id: req.session.user_id
    })
    .then(dbWatchData => res.json(dbWatchData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

// PUT Watch liking route
router.put('/uplike', withAuth, (req, res) => {
    if (req.session) {
      Watch.uplike({ ...req.body, user_id: req.session.user_id }, { Likes, Comment, User })
        .then(updatedLikesData => res.json(updatedLikesData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

  // DELETE Watches
router.delete('/:id', withAuth, (req, res) => {
    Watch.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })
      .then(dbWatchData => {
        if (!dbWatchData) {
          res.status(404).json({ message: 'Watch NOT found with this id' });
          return;
        }
        res.json(dbWatchData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
