# Useful Notes

## From Email

Create Alexa Skill in portal. Copy skill ID from skills list.

Create lambda function in AWS US-East region. Set runtime to Node.js 8.10. Under Add Triggers, click Alexa Skills Kit. Paste the copied Skill ID there and save. To see code editor again, click on the skill name in the diagram next to Add Triggers.

Bump up memory and timeout (1600MB, 20 sec?).

Enable testing on Alexa side of the portal by trying to test and clicking the slider that pops up.

Go back to build and make sure to set an invocation and a sample intent up.

Make sure to save and build manifest after changes.

Adding beta testers is done under distribution.

## Resources
    * https://developer.amazon.com/docs/custom-skills/slot-type-reference.html
    * https://www.npmjs.com/package/ask-sdk-core