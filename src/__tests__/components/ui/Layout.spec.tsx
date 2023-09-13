import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Layout } from '../../../components/ui/Layout/Layout';
import { StaticRouter } from 'react-router-dom/server';

describe('Layout component', () => {
  it('should render the Layout with some text', () => {
    const { asFragment } = render(
      <StaticRouter location="/">
        <Layout>Test</Layout>
      </StaticRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
