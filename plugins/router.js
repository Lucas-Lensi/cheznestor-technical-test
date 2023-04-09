import authRoutes from '../modules/auth/auth.route.js';
import userRoutes from '../modules/user/user.route.js';

export default async ({ app, cors }) => {
  app.use('/auth', cors(), authRoutes);
  app.use('/user', cors(), userRoutes);

  app.get('/healthChecker', (req, res, next) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to my technical test ! 🚀🚀',
    });
  });

  app.all('*', (req, res) => {
    res.status(404).send({
      'bad-request 404': 'The requested route is not implemented',
    });
  });
};
