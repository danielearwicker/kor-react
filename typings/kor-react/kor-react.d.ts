/// <reference path="../react/react.d.ts" />

declare module "kor-react" {

    import React = require('react');

    export class Komponent<P> extends React.Component<P, {}> {
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): React.ReactElement<any>;
        renderKor(): React.ReactElement<any>;
    }
}
