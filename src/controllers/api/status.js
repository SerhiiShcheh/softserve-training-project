export const get = (req, res) => {
  res.status(200).json({
    version: '1.0',
    status: 'available'
  });
};
