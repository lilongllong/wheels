import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../../src/components/PageHeader';
import { MemoryRouter } from 'react-router-dom';

describe('PageHeader', () => {
  it('可以正常打开布局', () => {
    render(<MemoryRouter initialEntries={['a']}>
      <PageHeader logo='https://www.baidu.com' title='测试' actions={['action1']} />
    </MemoryRouter>);
    expect(screen.getByText('测试')).toBeInTheDocument();
  });
});
