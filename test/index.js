/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

// UnitTest
import '../modules/auth/auth.service.test.js';
import '../modules/apartment/apartment.service.test.js';
import '../modules/room/room.service.test.js';
import '../modules/user/user.service.test.js';
import '../modules/reservation/reservation.service.test.js';

// Integration test
import '../modules/auth/auth.test.js';
import '../modules/user/user.test.js';
import '../modules/apartment/apartment.test.js';
import '../modules/room/room.test.js';
import '../modules/reservation/reservation.test.js';
