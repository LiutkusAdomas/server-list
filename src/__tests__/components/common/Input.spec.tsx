import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../../../components/common/Input/Input';

describe('Input component', () => {
  it('should render an input element without error', () => {
    const { asFragment } = render(
      <Input
        label="Test"
        control="test"
        type="text"
        required={true}
        autocomplete="username"
        onChange={vi.fn()}
      />
    );
    expect(asFragment).toMatchSnapshot();
  });
  it('should render an input element with an error', () => {
    const { asFragment } = render(
      <Input
        label="Test"
        control="test"
        type="text"
        required={true}
        autocomplete="username"
        onChange={vi.fn()}
        errorMesage="This is an error message"
      />
    );
    expect(asFragment).toMatchSnapshot();
  });
});
