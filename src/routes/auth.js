import { Router } from 'express';

const router = Router();

router.get('/register', (req, res) => {
  res.json({
    data: 'Registration endpoint'
  });
});

export default router;
