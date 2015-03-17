import kor = require('kor');
import React = require('react');

function ignore() {}

export class Komponent<P, S> extends React.Component<P, S> {

    private _koCachedInternals: {
        rendered?: React.ReactElement<any>;
        listener?: Kor.Computed<void>;
        subscription?: Kor.Subscription;
        renderSoon?: Kor.Observable<void>;
    };

    private _koInternals() {
        if (!this._koCachedInternals) {
            this._koCachedInternals = {};
        }
        return this._koCachedInternals;
    }

    componentWillReceiveProps(nextProps: P) {
        var internals = this._koInternals();
        if (internals.renderSoon) {
            internals.renderSoon.notifySubscribers();
        }
    }

    componentDidMount() {
        var internals = this._koInternals();
        if (!internals.listener) {
            internals.renderSoon = kor.observable<void>();
            internals.listener = kor.pureComputed(() => {
                internals.renderSoon();
                internals.rendered = this.renderKor();
                this.forceUpdate();
            }).extend({ throttle: 1 });
        }

        internals.subscription = internals.listener.subscribe(ignore);
    }

    componentWillUnmount() {
        var internals = this._koInternals();
        internals.subscription.dispose();
        internals.subscription = null;
    }

    render() {
        return this._koInternals().rendered || null;
    }

    // Override this instead of render()
    renderKor() {
        return <React.ReactElement<any>>null;
    }
}
