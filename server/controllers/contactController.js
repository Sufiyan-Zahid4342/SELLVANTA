const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { fullName, email, phone, service, budget, projectDetails } = req.body;

    if (!fullName || !email || !service || !projectDetails) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const contact = await Contact.create({
      fullName,
      email,
      phone,
      service,
      budget,
      projectDetails,
    });

    res.status(201).json({
      message: 'Your message has been sent successfully. We will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
