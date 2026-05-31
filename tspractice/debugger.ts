
debugger
type s111s = 'a' | 'b'  extends  'a' | 'b' | 'c' ? true : false;

// type Extract<T, K> = K extends T ? T : never;
// export type C = Extract<1 | 2 | 3, 1 | 2 | 4>;

// (1 | 2 | 3 ) | (1 | 2 | 3 ) | never


// (1 | 2 | 3 ) | (1 | 2 | 3 ) | never