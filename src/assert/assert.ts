import * as PrettyError from 'pretty-error';

import Reporter from '../models/Reporter';
import Report from '../models/Report';
import MessageType from '../messages/MessageType';
import * as Counter from '../counter/Counter';
import { errorStyle } from '../resources/errorStyle';
import Expectation from '../expectation/Expectation';
import { FailureReport, failureList } from '../models/FailureReport';

export function assert(testResult: boolean, expectation: Expectation ): boolean {

  if (expectation.isNot ? testResult : !testResult) {
      const failureMessages: Report[] = [];
      Reporter.report(new Report([expectation.des], MessageType.ERROR));

      if (expectation.isNot) {
        expectation.failureDetails[2] = 'not ' + expectation.failureDetails[2];
      }
      failureMessages.push(
          new Report(
              expectation.failureDetails,
              MessageType.COMPARISON
          )
      );

      Counter.incrementFailCount();
      try {
          throw new Error('Assertion error');
      }

      catch (error) {
          let prettyError = new PrettyError();
          prettyError.skipPackage('bed-rock');
          prettyError.appendStyle(errorStyle);

          let prettyTrace = prettyError.render(error);
          failureList.push(new FailureReport(
              expectation.des,
              (failureList.length + 1) + ') ' + expectation.contextChain.join(' => ') + ' => ' + expectation.des + ': ',
              error.message,
              expectation.failureMessages,
              prettyTrace
          ));
      }
      return false;
  }
  else {

      Reporter.report(new Report([expectation.des], MessageType.OK));
      Counter.incrementPassCount();
      return true;
  }
}
