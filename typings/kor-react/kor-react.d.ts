/// <reference path="../react/react.d.ts" />

declare module "kor-react" {

    import React = require('react');

    export class Komponent<P, S> extends React.Component<P, S> {
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): React.ReactElement<any>;
        renderKor(): React.ReactElement<any>;
    }
}
