import {renderHook} from '@testing-library/react-hooks';
import useDebounce from './use-debounce';

const TEST = 'TEST';

describe('Hook: useDebounce', () => {
  it('should return TEST', () => {
    const {result} = renderHook(() => useDebounce(TEST));
    expect(result.current).toBe(TEST);
  });
});
