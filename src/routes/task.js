import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.json('get task 200');
});

router.post('/', (req, res) => {

  console.log('===== Task Post Request Body =====', req.body);
  
  const newTask = new models.Task({
    title: req.body.title,
    description: req.body.description,
    subtasks: req.body.subtasks
  });
 console.log(newTask); 
  res.json('working')  
  
});

export default router;
