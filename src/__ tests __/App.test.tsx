const formatDuration = require('../utils');

// import { formatDuration } from '../utils';

test('demo', () => {
  expect(formatDuration(80)).toBe('1h 20m');
})