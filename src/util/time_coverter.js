const toTimestamp = (date) => {
	return Math.floor(date / 1000)
};

const toDate = (timestamp) => {
	return new Date(timestamp * 1000);
};

module.exports = {
  toTimestamp,
  toDate,
};
