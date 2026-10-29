const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    await Newsletter.create({ email });

    res.status(201).json({ message: 'Successfully subscribed to our newsletter!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
