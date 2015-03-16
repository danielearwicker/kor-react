import kor = require('kor');
import React = require('react');

function ignore() {}

export class Komponent<P, S> extends React.Component<P, S> {

  private _komponent_internals: {
    rendered?: React.ReactElement<any>;
    listener?: Kor.Computed<void>;
    subscription?: Kor.Subscription;
  } = {};

  componentDidMount() {

    var internals = this._komponent_internals;

    if (!internals.listener) {
      internals.listener = kor.pureComputed(() => {
        internals.rendered = this.renderKor();
        this.forceUpdate();
      }).extend({ throttle: 1 });
    }

    internals.subscription = internals.listener.subscribe(ignore);
  }

  componentWillUnmount() {
    var internals = this._komponent_internals;
    internals.subscription.dispose();
    internals = null;
  }

  render() {
    var internals = this._komponent_internals;
    return (internals && internals.rendered) || null;
  }

  // Override this instead of render()
  renderKor() {
    return <React.ReactElement<any>>null;
  }
}
