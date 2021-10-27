export const log = (params: any) => () => {
  console.log(params.req.body.query);
  console.log(params.req.body.variables);
};

// Create an object with a function that has the key context and
// so log.context is the function
// export const log = {
//   context: (params: any) => () => {
//     console.log(params.req.body.query);
//     console.log(params.req.body.variables);
//   },
// };
