import initialState from '../../store/initialState';

test('Notification initial state', () => {
  expect(initialState).toHaveProperty('notificationReducer');
});