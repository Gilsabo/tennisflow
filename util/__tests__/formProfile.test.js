import { expect, test } from '@jest/globals';
import Profile from '../../app/dashboard/profile/[username]/Profile';

test('updates first name when input value changes', () => {
  const userId = 1;
  const userName = 'John Doe';

  // Create an instance of the component
  const profileComponent = new Profile({ userId, userName });

  // Access the first name input directly from the component instance
  const firstNameInput = profileComponent.findByLabelText(/First name/i);

  // Simulate user typing directly without fireEvent
  firstNameInput.value = 'John';

  // Trigger the change event manually
  firstNameInput.onChange({ currentTarget: { value: 'John' } });

  // Access the first name input value again
  const updatedFirstName =
    profileComponent.findByLabelText(/First name/i).value;

  // Assert the result
  expect(updatedFirstName).toBe('John');
});
