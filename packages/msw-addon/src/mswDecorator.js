import { makeDecorator } from '@storybook/addons';
import { setupWorker } from 'msw';

let worker;

export function initializeWorker(options, handlers = []) {
  if (typeof global.process === 'undefined') {
    worker = setupWorker(...handlers);
    worker.start(options);
  }
}

export const mswDecorator = makeDecorator({
  name: 'withMsw',
  parameterName: 'msw',
  wrapper: (storyFn, context, { parameters = [] }) => {
    if (worker) {
      worker.resetHandlers();
      worker.use(...parameters);
    }
    return storyFn(context);
  },
});
