/**
 * Test Scenario: Breaking API Change
 * 
 * BREAKING CHANGE: Response format changed
 * - Removed: email field (direct access)
 * - Added: contactInfo nested object
 * - Changed: Authentication from API key to OAuth2
 */

import { Router } from 'express';

const router = Router();

router.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  // NEW: OAuth2 authentication required
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'OAuth2 token required' });
  }
  
  // NEW RESPONSE FORMAT (BREAKING)
  const user = {
    id,
    name: 'Test User',
    contactInfo: {  // NEW: email moved here
      email: 'test@example.com',
      phone: '+1234567890',
    },
    createdAt: new Date().toISOString(),
  };
  
  return res.json(user);
});

export default router;
