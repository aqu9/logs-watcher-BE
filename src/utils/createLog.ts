import * as moment from 'moment';

export const formatLog = (text: string) => {
  const log = `timeStamp: ${moment()} message: ${text}`;
  return log;
};
