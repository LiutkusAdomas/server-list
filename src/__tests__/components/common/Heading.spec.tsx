import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from '../../../components/common/Heading/Heading';

describe('Heading component', () => {
  it('should render a heading element with text', () => {
    const { asFragment } = render(<Heading>Test</Heading>);
    expect(asFragment).toMatchSnapshot();
  });
});
