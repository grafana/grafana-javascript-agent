import { Agent, isPrimitive } from '@grafana/agent-core';

import { primitiveUnhandledType, primitiveUnhandledValue } from './const';
import type { ExtendedPromiseRejectionEvent } from './extendedPromiseRejectionEvent';
import { getErrorDetails } from './getErrorDetails';

export function registerOnunhandledrejection(agent: Agent): void {
  window.addEventListener('unhandledrejection', (event: ExtendedPromiseRejectionEvent) => {
    let error = event;

    if (error.reason) {
      error = event.reason;
    } else if (event.detail?.reason) {
      error = event.detail?.reason;
    }

    let value: string | undefined;
    let type: string | undefined;

    if (isPrimitive(error)) {
      value = `${primitiveUnhandledValue} ${String(error)}`;
      type = primitiveUnhandledType;
    } else {
      [value, type] = getErrorDetails(error);
    }

    if (value) {
      agent.api.pushError(new Error(value), { type });
    }
  });
}
