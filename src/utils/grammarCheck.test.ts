import {
  saplingCheck,
  languageToolCheck,
  proWritingAidCheck,
} from './grammarCheck';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

it('languageToolCheck', async () => {
  const languageTool = await languageToolCheck(
    'en-US',
    'he main reason why people say a sanctions tool need is that if it exists countries would hesitate to behave selfishly and the world would become safer.',
  );

  const { matches } = languageTool;
  expect(matches.length).toBeGreaterThanOrEqual(1);
  expect(matches[0].message.length).toBeGreaterThanOrEqual(1);
  if (matches[0].shortMessage !== null) {
    expect(matches[0].shortMessage.length).toBeGreaterThanOrEqual(1);
  }
  expect(matches[0].offset).toBeGreaterThanOrEqual(0);
  expect(matches[0].length).toBeGreaterThanOrEqual(1);
  expect(matches[0].replacements.length).toBeGreaterThanOrEqual(1);
  expect(matches[0].replacements[0].value.length).toBeGreaterThanOrEqual(1);
  if (matches[0].rule !== null) {
    expect(matches[0].rule.description.length).toBeGreaterThanOrEqual(1);
    if (matches[0].rule.urls !== null) {
      expect(matches[0].rule.urls.length).toBeGreaterThanOrEqual(1);
      expect(matches[0].rule.urls[0].value.length).toBeGreaterThanOrEqual(1);
    }
    if (matches[0].rule.issueType !== null) {
      expect(matches[0].rule.issueType.length).toBeGreaterThanOrEqual(1);
    }
  }
  expect(languageTool.result).toBe('corrected');
  expect(languageTool.error).toBeNull();
});

it('saplingCheck', async () => {
  const sapling = await saplingCheck(
    'en-US',
    'he main reason why people say a sanctions tool need is that if it exists countries would hesitate to behave selfishly and the world would become safer.',
    true,
  );
  const { edits } = sapling;

  expect(edits.length).toBeGreaterThanOrEqual(1);
  expect(edits[0].sentence.length).toBeGreaterThanOrEqual(1);
  expect(edits[0].sentence_start).toBeGreaterThanOrEqual(0);
  expect(edits[0].start).toBeGreaterThanOrEqual(0);
  expect(edits[0].end).toBeGreaterThanOrEqual(0);
  expect(edits[0].replacement.length).toBeGreaterThanOrEqual(1);
  expect(edits[0].general_error_type.length).toBeGreaterThanOrEqual(1);

  expect(sapling.result).toBe('corrected');
  expect(sapling.error).toBeNull();
});

it('proWritingAidCheck', async () => {
  const proWritingAid = await proWritingAidCheck(
    'en-US',
    'he main reason why people say a sanctions tool need is that if it exists countries would hesitate to behave selfishly and the world would become safer.',
  );
  const { tags } = proWritingAid;

  expect(tags.length).toBeGreaterThanOrEqual(1);
  expect(tags[0].startPos).toBeGreaterThanOrEqual(0);
  expect(tags[0].endPos).toBeGreaterThanOrEqual(0);
  expect(tags[0].hint.length).toBeGreaterThanOrEqual(1);
  expect(tags[0].category.length).toBeGreaterThanOrEqual(1);
  expect(tags[0].categoryDisplayName.length).toBeGreaterThanOrEqual(1);
  expect(tags[0].suggestions.length).toBeGreaterThanOrEqual(1);

  expect(proWritingAid.result).toBe('corrected');
  expect(proWritingAid.error).toBeNull();
});
