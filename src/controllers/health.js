import os from 'os';

export default (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Server is up and running',
      hostname: os.hostname(),
      uptime: os.uptime(),
    },
  });
}
