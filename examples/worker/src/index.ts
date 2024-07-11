import { instrument, instrumentDO, ResolveConfigFn } from '../../../src/index';
import handler, { Env, OtelDO } from './handler';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const config: ResolveConfigFn = (env: Env, _trigger) => {
    return {
        exporter: {
            url: 'https://api.honeycomb.io/v1/traces',
            headers: { 'x-honeycomb-team': env['otel.exporter.headers.x-honeycomb-team'] },
        },
        resource: {
            [SEMRESATTRS_SERVICE_NAME]: 'greetings',
            [SEMRESATTRS_SERVICE_VERSION]: '0.1',
        },
    };
};

const doConfig: ResolveConfigFn = (env: Env, _trigger) => {
    return {
        exporter: {
            url: 'https://api.honeycomb.io/v1/traces',
            headers: { 'x-honeycomb-team': env['otel.exporter.headers.x-honeycomb-team'] },
        },
        resource: { [SEMRESATTRS_SERVICE_NAME]: 'greetings-do' },
    };
};

const TestOtelDO = instrumentDO(OtelDO, doConfig);

export default instrument(handler, config);

export { TestOtelDO };
