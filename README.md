# react-face-kyc

> Quite useful react snippet for automatic photo capture with check of correct face position (KYC document face liveness)

It uses [FaceWASM](https://github.com/oriolmapu/FaceWASM) - face detection implementation based on [Haar-cascades](https://docs.opencv.org/3.4/d2/d99/tutorial_js_face_detection.html). This method is performant and [can be trained](https://docs.opencv.org/4.x/dc/d88/tutorial_traincascade.html) instead of programmed

![screenshot](./docs/screencast.gif)

## Usage

```bash
npm install
npm start
```

## Code sample

```tsx
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
```
