import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TableRow } from '../../../components/common/TableRow/TableRow';
import { Server } from '../../../model/Server.type';

const server: Server = {
  id: '1',
  name: 'Test',
  distance: 1,
  flag: 'flag.svg',
};

describe('Table Row component', () => {
  it('should render a table row component', () => {
    const { asFragment } = render(<TableRow item={server} />);
    expect(asFragment).toMatchSnapshot();
  });
});
