import { Subject } from "react-declarative";

export const recorder = new class {

    public readonly resultSubject = new Subject<Blob>();

    private recorder?: MediaRecorder;
    private stream?: MediaStream;

    provideStream = (stream: MediaStream) => {
        this.stream = stream;
    };

    beginRecord = () => {
        const recorder = new MediaRecorder(this.stream!, {
            mimeType: 'video/webm;codecs=vp9',
        });
        this.recorder = recorder;
        recorder.start();
    };

    endRecord = () => {
        if (!this.recorder || this.recorder.state !== 'recording') {
            throw new Error('video is not capturing');
        }
        this.recorder.addEventListener('dataavailable', (e) => {
            this.resultSubject.next(e.data);
        }, {
            once: true
        });
        this.recorder.stop();
        this.recorder = undefined;
    };

};

export default recorder;
