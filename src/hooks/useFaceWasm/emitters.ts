import { Source } from 'react-declarative';

import { CC_SECONDS_TO_VERIFY } from '../../config/params';

import recorder from './recorder';

export const messageEmitter = Source.multicast(() =>
    Source.create<{
        type: "facewasm-msg";
        text: string;
        color: string;
    }>((next) => {
        const handler = (e: any) => {
            if (e.origin === origin) {
                const { data } = e;
                const { type } = data;
                if (data.type === 'facewasm-msg') {
                    const { text, color } = data;
                    next({
                        type,
                        text,
                        color,
                    });
                }
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    })
);

export const cordEmitter = Source.multicast(() =>
    Source.create<{
        type: "facewasm-cord";
        x: number;
        y: number;
        w: number;
        h: number; 
    }>((next) => {
        const handler = (e: any) => {
            if (e.origin === origin) {
                const { data } = e;
                const { type } = data;
                if (data.type === 'facewasm-cord') {
                    const { x, y, w, h } = data;
                    next({ type, x, y, w, h });
                }
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    })
);

export const stateEmitter = Source.multicast(() =>
    Source.create<{
        type: "facewasm-state";
        state: boolean;
    }>((next) => {
        const handler = (e: any) => {
            if (e.origin === origin) {
                const { data } = e;
                const { type } = data;
                if (data.type === 'facewasm-state') {
                    const { state } = data;
                    next({ type, state });
                }
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    })
);

export const verifyCompleteEmitter = Source.multicast(() =>
    Source
        .join([
            stateEmitter,
            Source.fromInterval(1_000),
        ])
        .reduce((acm, [{ state: isValid }]) => {
            if (isValid) {
                return acm + 1;
            }
            return 0;
        }, 0)
        .tap((ticker) => {
            if (ticker === 1) {
                recorder.beginRecord();
            }
        })
        .filter((ticker) => ticker === CC_SECONDS_TO_VERIFY)
        .tap(() => {
            recorder.endRecord();
        })
);
