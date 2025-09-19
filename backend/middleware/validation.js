export const validateDateRange = (req, res, next) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    return res.status(400).json({ 
      error: 'Start date and end date are required',
      message: 'Please provide both startDate and endDate parameters'
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ 
      error: 'Invalid date format',
      message: 'Please provide dates in YYYY-MM-DD format'
    });
  }

  if (start > end) {
    return res.status(400).json({ 
      error: 'Invalid date range',
      message: 'Start date must be before end date'
    });
  }

  const maxRange = 2 * 365 * 24 * 60 * 60 * 1000;
  if (end - start > maxRange) {
    return res.status(400).json({ 
      error: 'Date range too large',
      message: 'Maximum date range is 2 years'
    });
  }

  next();
};

export const validatePagination = (req, res, next) => {
  const { page = 1, limit = 50 } = req.query;
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (pageNum < 1) {
    return res.status(400).json({ 
      error: 'Invalid page number',
      message: 'Page must be greater than 0'
    });
  }

  if (limitNum < 1 || limitNum > 1000) {
    return res.status(400).json({ 
      error: 'Invalid limit',
      message: 'Limit must be between 1 and 1000'
    });
  }

  req.query.page = pageNum;
  req.query.limit = limitNum;
  
  next();
};