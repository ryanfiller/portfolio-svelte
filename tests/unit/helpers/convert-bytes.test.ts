import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { convertBytes } from '$helpers';

describe('convertBytes()', () => {
	let result;

	const bytes = 1073741824; // this is 1GB in bytes

  describe.each([
    {
      format: 'bytes',
      expected: '1073741824.00'
    },
    {
      format: 'kilobytes',
      expected: '1048576.00'
    },
    {
      format: 'megabytes',
      expected: '1024.00'
    },
    {
      format: 'gigabytes',
      expected: '1.00'
    }
  ])('describe object add($a, $b)', ({ format, expected }) => {
    it(`calculates ${format} correctly`, async () => {
      // @ts-ignore
      result = await convertBytes(bytes, format);
      expect(result).toEqual(expected);
    });
  });
});
