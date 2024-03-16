import { logFilePath, noOfLinesTofetch } from './constants';
import * as fs from 'fs';

export const readLastLogLines = (): string[] => {
  const lines: string[] = [];

  const fileContent = fs.readFileSync(logFilePath, 'utf-8');

  const allLines = fileContent.split('\n');

  const startIndex = Math.max(0, allLines.length - noOfLinesTofetch + 1);
  for (let i = startIndex; i < allLines.length; i++) {
    lines.push(allLines[i]);
  }
  lines.pop();
  return lines;
};
