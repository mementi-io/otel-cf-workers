import { instrument, ResolveConfigFn } from '../../../src/index';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

interface QueueData {
    pathname: string;
}

export interface Env {
    QUEUE: Queue<QueueData>;
    API_KEY: string;
}

const handler: ExportedHandler<Env, QueueData> = {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        await env.QUEUE.send({ pathname: url.pathname });
        return new Response('Hello World!');
    },

    async queue(batch: MessageBatch<QueueData>, env: Env, ctx: ExecutionContext) {
        for (const message of batch.messages) {
            console.log(message.body.pathname);
            message.ack();
        }
    },
};

const config: ResolveConfigFn = (env: Env, trigger) => {
    return {
        exporter: {
            url: 'https://api.honeycomb.io/v1/traces',
            headers: { 'x-honeycomb-team': env.API_KEY },
        },
        resource: {
            [SEMRESATTRS_SERVICE_NAME]: 'greetings',
            [SEMRESATTRS_SERVICE_VERSION]: '0.1',
        },
    };
};

export default instrument(handler, config);
