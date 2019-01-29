import { checkType } from '../utilities';

export function toBeStringContaining(text: string, caseSensitive: boolean = false): boolean {
  checkType(['String'], this.subject);
  this.failureDetails = ['Expected',
      this.subject, 'to be a string containing',
      text,
      '(case',
      caseSensitive ? 'sensitive' : 'insensitive'
  ];
  if (caseSensitive) {
      return this.assert(this.subject.includes(text));
  }
  else {
      return this.assert(this.subject.toLowerCase().includes(text.toLowerCase()));
  }
}