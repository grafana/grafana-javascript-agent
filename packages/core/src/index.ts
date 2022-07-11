export { agent } from './agent';
export type { Agent } from './agent';

export { allLogLevels, defaultExceptionType, defaultLogLevel, LogLevel } from './api';
export type {
  API,
  APIEvent,
  ExceptionEvent,
  ExceptionStackFrame,
  ExceptionsAPI,
  ExtendedError,
  InstrumentationLibrarySpan,
  LogContext,
  LogEvent,
  LogsAPI,
  MeasurementEvent,
  MeasurementsAPI,
  MetaAPI,
  PushErrorOptions,
  PushLogOptions,
  PushMeasurementOptions,
  ResourceSpan,
  Stacktrace,
  TraceContext,
  TraceEvent,
  TracesAPI,
} from './api';

// TODO: Remove this alias after the updating the projects where we dogfood
export { initializeGrafanaAgent, initializeGrafanaAgent as initializeAgent } from './initialize';

export { defaultGlobalObjectKey } from './config';
export type { Config, Patterns, StacktraceParser } from './config';

export { BaseInstrumentation } from './instrumentations';
export type { Instrumentation } from './instrumentations';

export type { InternalLogger } from './internalLogger';

export type {
  App,
  Attributes,
  Browser,
  Meta,
  MetaGetter,
  MetaItem,
  Metas,
  Page,
  SDK,
  SDKIntegration,
  Session,
  User,
} from './metas';

export type { OriginalConsole } from './originalConsole';

export { BaseTransport, getTransportBody, TransportItemType, transportItemTypeToBodyKey } from './transports';
export type {
  BeforeSendHook,
  Transport,
  TransportBody,
  TransportItem,
  TransportItemPayload,
  Transports,
} from './transports';

export {
  BaseExtension,
  getCurrentTimestamp,
  globalObject,
  isArray,
  isBoolean,
  isDomError,
  isDomException,
  isElement,
  isError,
  isErrorEvent,
  isEvent,
  isFunction,
  isInstanceOf,
  isInt,
  isNull,
  isNumber,
  isObject,
  isPrimitive,
  isRegExp,
  isString,
  isSymbol,
  isSyntheticEvent,
  isThenable,
  isToString,
  isTypeof,
  isUndefined,
  noop,
  prefixAgentMessage,
} from './utils';
export type { BaseObject, BaseObjectKey, BaseObjectPrimitiveValue, BaseObjectValue } from './utils';

export { VERSION } from './version';
