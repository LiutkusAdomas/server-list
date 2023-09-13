import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFound } from '../../pages/NotFound/NotFound';

describe('Not Found page', () => {
  it('should render a not found page', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment).toMatchSnapshot();
  });
});
