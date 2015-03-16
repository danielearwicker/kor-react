var kor = require('kor');

function komponent(spec) {

  // Save these so we can overwrite them
  var mount = spec.componentDidMount;
  var unmount = spec.componentWillUnmount;
  var render = spec.render;

  spec.componentDidMount = function() {
    var self = this;
    var internals = self._komponent_internals = {};

    if (!internals.listener) {
      internals.listener = kor.pureComputed(function() {
        internals.rendered = render.call(self);
        self.forceUpdate();
      }).extend({ throttle: 1 });
    }
    internals.subscription = internals.listener.subscribe();
    if (mount) {
      mount.call(self);
    }
  };

  spec.componentWillUnmount = function() {
    var internals = this._komponent_internals;
    internals.dispose();
    internals = null;
    if (unmount) {
      unmount.call(this);
    }
  };

  spec.render = function() {
    var internals = this._komponent_internals;
    return (internals && internals.rendered) || null;
  };

  return spec;
}

exports.komponent = komponent;
