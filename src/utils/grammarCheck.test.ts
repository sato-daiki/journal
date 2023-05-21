import { saplingCheck, languageToolCheck } from './grammarCheck';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

it('languageToolCheck', async () => {
  const languageTool = await languageToolCheck(
    'en-US',
    'he main reason why people say a sanctions tool need is that if it exists countries would hesitate to behave selfishly and the world would become safer.',
  );
  expect(languageTool.matches.length).toBeGreaterThan(0);
  expect(languageTool.result).toBe('corrected');
  expect(languageTool.error).toBeNull();
});

it('saplingCheck', async () => {
  const sapling = await saplingCheck(
    'en-US',
    'he main reason why people say a sanctions tool need is that if it exists countries would hesitate to behave selfishly and the world would become safer.',
    true,
  );
  expect(sapling.edits.length).toBeGreaterThan(0);
  expect(sapling.result).toBe('corrected');
  expect(sapling.error).toBeNull();
});
