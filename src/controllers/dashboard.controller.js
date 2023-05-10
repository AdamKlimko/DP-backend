const { dashboardService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getDashboardData = catchAsync(async (req, res) => {
  const result = await dashboardService.getDashboardData();
  res.send(result);
});

const getStorageData = catchAsync(async (req, res) => {
  const result = await dashboardService.getStorageData();
  res.send(result);
});

const getProfitBarChart = catchAsync(async (req, res) => {
  const result = await dashboardService.getProfitBarChart(req.params.timeFrame);
  res.send(result);
});

const getCustomerOrderChart = catchAsync(async (req, res) => {
  const result = await dashboardService.getCustomerOrderChart(req.params.timeFrame);
  res.send(result);
});

module.exports = {
  getDashboardData,
  getStorageData,
  getProfitBarChart,
  getCustomerOrderChart,
};
