import {Rule} from './rule.enum';

export interface User {
  id: string,
  firstname: string,
  lastname: string,
  rule: Rule
}
