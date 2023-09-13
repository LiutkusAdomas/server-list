import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from '../../../components/common/Container/Container';

describe('Container component', () => {
  it('should render a container with text', () => {
    const { asFragment } = render(<Container>Test</Container>);
    expect(asFragment).toMatchSnapshot();
  });
  it('should render a container with text and additional classes', () => {
    const { asFragment } = render(<Container additional="w-full">Test</Container>);
    expect(asFragment).toMatchSnapshot();
  });
});
