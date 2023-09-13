import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../../../components/common/Button/Buttons';

describe('Button component', () => {
  it('should render a button with default props', () => {
    const { asFragment } = render(<Button onClick={vi.fn()}> </Button>);
    expect(asFragment).toMatchSnapshot();
  });
  it('should render a button with a label', () => {
    const { asFragment } = render(<Button onClick={vi.fn()} label="Test"></Button>);
    expect(asFragment).toMatchSnapshot();
  });
  it('should render a disabled button', () => {
    const { asFragment } = render(<Button onClick={vi.fn()} disabled={true}></Button>);
    expect(asFragment).toMatchSnapshot();
  });
  it('should render a non disabled button', () => {
    const { asFragment } = render(<Button onClick={vi.fn()} disabled={false}></Button>);
    expect(asFragment).toMatchSnapshot();
  });
  it('should render a button with some text inside', () => {
    const { asFragment } = render(<Button onClick={vi.fn()}>There is some text</Button>);
    expect(asFragment).toMatchSnapshot();
  });
});
