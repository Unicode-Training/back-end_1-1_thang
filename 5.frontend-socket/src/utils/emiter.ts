function EventEmitter() { }

EventEmitter.prototype.on =
    EventEmitter.prototype.addListener = function (event: string, callback: (data: unknown) => void) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(callback);
        return this;
    };

EventEmitter.prototype.removeListener = function (event: string, callback: (data: unknown) => void) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    this._events[event].splice(this._events[event].indexOf(callback), 1);
    return this;
};

EventEmitter.prototype.emit = function (event: string, ...args: unknown[]) {
    this._events = this._events || {};
    if (event in this._events === false) return false;
    for (let i = 0; i < this._events[event].length; i++) {
        this._events[event][i].apply(this, Array.prototype.slice.call([event, ...args], 1));
    }
    return true;
};

export default EventEmitter as unknown as new () => {
    on: (event: string, callback: (data: unknown) => void) => void;
    emit: (event: string, data: unknown) => void;
}