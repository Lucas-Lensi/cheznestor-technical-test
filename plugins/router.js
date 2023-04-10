import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/user/user.routes.js';
import apartmentRoutes from '../modules/apartment/apartment.routes.js';
import roomRoutes from '../modules/room/room.routes.js';

export default async ({ app, cors }) => {
  app.use('/auth', cors(), authRoutes);
  app.use('/user', cors(), userRoutes);
  app.use('/apartment', cors(), apartmentRoutes);
  app.use('/room', cors(), roomRoutes);

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
