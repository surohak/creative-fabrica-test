import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { mockedData } from '@/__tests__/setup/handlers';
import { getCreatorsInfo } from '@/utils';

import Page from '../app/page';

const { sortedCreators, productsByCreatorId } = getCreatorsInfo(mockedData);

describe('Page', () => {
  test('renders without crashing', () => {
    render(<Page />);
    expect(screen.getByText('Top 3 Active Creators')).toBeTruthy();
  });
  test('renders creators list', async () => {
    render(<Page />);

    await waitFor(() => {
      sortedCreators.slice(0, 3).forEach((creator) => {
        expect(screen.getByText(creator.id)).toBeTruthy();
        expect(screen.getByText(creator.email)).toBeTruthy();
      });
    });
  });
  test('renders more/less creators', async () => {
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText(sortedCreators[0].id)).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Show More'));

    sortedCreators.slice(0, sortedCreators.length - 1).forEach((creator) => {
      expect(screen.getByText(creator.id)).toBeTruthy();
      expect(screen.getByText(creator.email)).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Show Less'));

    sortedCreators.slice(3, sortedCreators.length - 1).forEach((creator) => {
      expect(screen.queryByText(creator.id)).toBeNull();
      expect(screen.queryByText(creator.email)).toBeNull();
    });
  });
  test('renders creator products', async () => {
    render(<Page />);

    await waitFor(() => {
      fireEvent.click(screen.getByText(sortedCreators[0].id));
      expect(screen.getByText('Creator Products')).toBeTruthy();

      Object.values(productsByCreatorId[sortedCreators[0].id]).forEach((product) => {
        expect(screen.getByText(product.id)).toBeTruthy();
        expect(screen.getByText(new Date(product.createTime).toDateString())).toBeTruthy();
      });
    });
  });
});
