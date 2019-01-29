export const printStartHeader = () => {
  Reporter.report(
      new Report('Bedrock starting...',
          MessageType.DEFAULT),
      true
  );
  Reporter.report(
      new Report('',
          MessageType.DEFAULT)
  );
};