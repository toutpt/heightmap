const cache = new Map();

/**
 * ncols, nrows, xllcorner, yllcorner, cellsize, NODATA and values becomes an object
 * We also add the average value
 * @return {Object} config
 */
export function parse(str) {
	if (cache.get(str)) {
		return cache.get(str);
	}
	const lines = str.split('\n');
	const config = lines.reduce(
		(acc, line) => {
			if (!line) {
				return acc
			}
			if (line.startsWith('ncols')) {
				acc.ncols = parseInt(line.replace('ncols', '').trim(), 10)
			} else if (line.startsWith('nrows')) {
				acc.nrows = parseInt(line.replace('nrows', '').trim(), 10)
			} else if (line.startsWith('xllcorner')) {
				acc.xllcorner = parseInt(line.replace('xllcorner', '').trim(), 10)
			} else if (line.startsWith('yllcorner')) {
				acc.yllcorner = parseInt(line.replace('yllcorner', '').trim(), 10)
			} else if (line.startsWith('cellsize')) {
				acc.cellsize = parseInt(line.replace('cellsize', '').trim(), 10)
			} else if (line.startsWith('NODATA_value')) {
				acc.NODATA = parseInt(line.replace('NODATA_value', '').trim(), 10)
			} else {
				const data = line
					.split(' ')
					.filter(Boolean)
					.map(d => parseInt(d, 10))
				const average =
					data.reduce((mcc, value) => {
						if (!acc.min || value < acc.min) {
							acc.min = value
						}
						if (!acc.max || value > acc.max) {
							acc.max = value
						}
						return mcc + value
					}, 0) / data.length
				acc.values.push(data)
				acc.average += average
			}
			return acc
		},
		{ values: [], average: 0, min: false, max: false }
	)
	config.average = config.average / config.nrows
	cache.set(str, config);
	return config
}