import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColumnHeader } from '../../../components/common/ColumnHeader/ColumnHeader';
import { ASCENDING, DESCENDING } from '../../../helpers/sorting';

describe('Column Header component', () => {
  it('should render the Column Header with the visual props and ascending arrow', () => {
    const { asFragment } = render(
      <ColumnHeader
        label="Test"
        sortKey="test"
        sortConfig={{ key: 'test', direction: ASCENDING }}
        requestSort={vi.fn()}
      />
    );
    expect(asFragment).toMatchSnapshot();
  });
  it('should render the Column Header with the visual props and descending arrow', () => {
    const { asFragment } = render(
      <ColumnHeader
        label="Test"
        sortKey="test"
        sortConfig={{ key: 'test', direction: DESCENDING }}
        requestSort={vi.fn()}
      />
    );
    expect(asFragment).toMatchSnapshot();
  });
});
