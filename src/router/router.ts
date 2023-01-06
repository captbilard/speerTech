import { Router } from 'express';

const router = Router();

// Read Tweet
router.get('/tweet', (req, res) => {});
router.get('/tweet/:id', (req, res) => {});

// Create Tweet
router.post('/tweet', (req, res) => {});

// Update Tweet
router.put('/tweet/:id', (req, res) => {});

// Delete Tweet
router.delete('/tweet/:id', (req, res) => {});

export default router;
