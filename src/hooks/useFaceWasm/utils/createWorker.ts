import { CC_ASSETS } from "../../../config/params";

const VERIFY_PREFIX = `${CC_ASSETS}/facewasm`;
const ENTRY_PAGE = `${VERIFY_PREFIX}/facewasm.html`;
const ENTRY_EMPTY = `${VERIFY_PREFIX}/empty.html`;

export const createWorker = (height: number, width: number, onload?: () => void) => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = `-${window.screen.width}px`;
    iframe.src = `${ENTRY_PAGE}#height=${height};width=${width}`;
    document.body.appendChild(iframe);
    if (onload) {
        iframe.onload = onload;
    }
    return () => {
        document.body.removeChild(iframe);
        iframe.src = ENTRY_EMPTY;
    };
};

export default createWorker;
