import { fireEvent, render } from '@testing-library/react-native';

import { PayslipListScreen } from '../index';

const mockUsePayslips = jest.fn();

jest.mock('@context/PayslipsContext', () => ({
  usePayslips: () => mockUsePayslips(),
}));

jest.mock('@components/list', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');

  return {
    List: ({
      data,
      onItemPress,
    }: {
      data: { id: string }[];
      onItemPress: (item: { id: string }) => void;
    }) => (
      <>
        <Text testID="list-count">{data.length}</Text>
        <TouchableOpacity testID="list-press" onPress={() => onItemPress(data[0])} />
      </>
    ),
  };
});

describe('PayslipListScreen', () => {
  it('renders list with payslips and navigates on item press', () => {
    const navigation = { push: jest.fn() } as any;
    const route = { key: 'PayslipList', name: 'PayslipList' } as any;
    const visiblePayslips = [{ id: 'PAY-001' }, { id: 'PAY-002' }];

    mockUsePayslips.mockReturnValue({ visiblePayslips });

    const { getByTestId } = render(<PayslipListScreen navigation={navigation} route={route} />);

    expect(getByTestId('list-count').props.children).toBe(2);

    fireEvent.press(getByTestId('list-press'));
    expect(navigation.push).toHaveBeenCalledWith('PayslipDetails', { id: 'PAY-001' });
  });
});
