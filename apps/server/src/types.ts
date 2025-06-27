// declare namespace Express {
//   export interface Request {
//     userId?: string;
//   }
// }

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
