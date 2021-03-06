import type { APIEvent, ExceptionEvent } from '../api';
import type { Config } from '../config';
import { getCurrentTimestamp } from '../utils';
import { BaseTransport } from './base';
import { initializeTransports } from './initialize';
import { TransportItem, TransportItemType } from './types';

class MockTransport extends BaseTransport {
  sentItems: TransportItem[] = [];

  send(item: TransportItem): void | Promise<void> {
    this.sentItems.push(item);
  }
}

describe('transports', () => {
  describe('config.ignoreErrors', () => {
    it('will filter out errors by string or regex', () => {
      const transport = new MockTransport();
      const config = {
        transports: [transport],
        ignoreErrors: ['Error: ResizeObserver', /FetchError[:\s\w\/]*pwc/],
      } as any as Config;

      const transports = initializeTransports(config);

      transports.execute(makeExceptionTransportItem('Error', 'ResizeObserver loop limit exceeded'));
      transports.execute(makeExceptionTransportItem('TypeError', '_.viz is undefined'));
      transports.execute(
        makeExceptionTransportItem(
          'FetchError',
          '404 \n  Instantiating https://pwc.grafana.net/public/react-router-dom'
        )
      );
      transports.execute(
        makeExceptionTransportItem('FetchError', '404 \n  Instantiating https://pwc.grafana.net/public/@emotion/css')
      );
      expect(transport.sentItems).toHaveLength(1);
      expect((transport.sentItems[0]?.payload as ErrorEvent).type).toEqual('TypeError');
    });
  });

  describe('config.beforeSend', () => {
    it('will not send events that are rejected by beforeSend hook', () => {
      const transport = new MockTransport();
      const hookedItems: TransportItem[] = [];
      const config = {
        transports: [transport],
        beforeSend: (item: TransportItem<APIEvent>) => {
          hookedItems.push(item);
          if (item.type === TransportItemType.EXCEPTION && (item.payload as ErrorEvent).type === 'TypeError') {
            return null;
          }
          return item;
        },
      } as any as Config;

      const transports = initializeTransports(config);
      transports.execute(makeExceptionTransportItem('Error', 'ResizeObserver loop limit exceeded'));
      transports.execute(makeExceptionTransportItem('TypeError', '_.viz is undefined'));
      expect(transport.sentItems).toHaveLength(1);
      expect(hookedItems).toHaveLength(2);
      expect((transport.sentItems[0]?.payload as ErrorEvent).type).toEqual('Error');
    });
    it('events can be modified by beforeSend hook', () => {
      const transport = new MockTransport();
      const config = {
        transports: [transport],
        beforeSend: (item: TransportItem<APIEvent>) => {
          if (item.type === TransportItemType.EXCEPTION) {
            return {
              ...item,
              payload: {
                ...item.payload,
                type: 'NewType',
              },
            };
          }
          return item;
        },
      } as any as Config;

      const transports = initializeTransports(config);
      transports.execute(makeExceptionTransportItem('Error', 'ResizeObserver loop limit exceeded'));
      expect(transport.sentItems).toHaveLength(1);
      expect((transport.sentItems[0]?.payload as ErrorEvent).type).toEqual('NewType');
    });
  });
});

function makeExceptionTransportItem(type: string, value: string): TransportItem<ExceptionEvent> {
  return {
    type: TransportItemType.EXCEPTION,
    payload: {
      type,
      value,
      timestamp: getCurrentTimestamp(),
      stacktrace: {
        frames: [],
      },
    },
    meta: {},
  };
}

export {};
