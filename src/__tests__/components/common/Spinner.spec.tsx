import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from '../../../components/common/Spinner/Spinner';

describe('Spinner component', () => {
  it('should render a spinner', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment).toMatchSnapshot();
  });
});
