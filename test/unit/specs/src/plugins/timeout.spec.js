import Vue from 'vue';
import timeout from '@/plugins/timeout';

test('timeout', () => {
    let callback = function(){};

    timeout({
        key:'unit-timeout',
        interval:50,
        callback: callback,
        immediately:false,
        keep: true,
        time: 1,
        context: {a:1},
        params: "i'm params."
    });

    let timer = timeout.get('unit-timeout');

    expect(timer).toHaveProperty('key', 'unit-timeout');
});

test('timeout.on', done => {
    let callback = function(){
        expect(this.a).toBe(1);
        done();
    };

    timeout({
        key:'unit-timeout-on',
        interval:50,
        callback: callback,
        immediately:false,
        keep: false,
        time: 1,
        context: {a:1},
        params: "i'm params."
    });

    timeout.on(timeout.get('unit-timeout-on'));
});

test('timeout.on.1', done => {
    let callback = function(){
        expect(this.a).toBe(1);
        done();
    };

    timeout({
        key:'unit-timeout-on-1',
        interval:50,
        callback: callback,
        immediately:false,
        keep: false,
        time: 1,
        context: {a:1},
        params: "i'm params."
    });

    timeout.on('unit-timeout-on-1');
});

test('timeout.one', done => {
    let callback = function(){
        expect(this.a).toBe(1);
        done();
    };

    timeout.one({
        key:'unit-timeout-one',
        interval:50,
        callback: callback,
        immediately:true,
        keep: false,
        time: 3,
        context: {a:1},
        params: "i'm params."
    });
});

test('timeout.off', () => {
    let callback = function(){ };

    timeout.one({
        key:'unit-timeout-off',
        interval:50,
        callback: callback,
        immediately:true,
        keep: false,
        time: 10,
        context: {a:1},
        params: "i'm params."
    });

    timeout.off('unit-timeout-off');

    expect(timeout.get('unit-timeout-off')).toBe(undefined);
});

test('timeout.get', () => {
    let callback = function(){ };

    timeout.one({
        key:'unit-timeout-get',
        interval:50,
        callback: callback,
        immediately:false,
        keep: false,
        time: 0,
        context: {a:1},
        params: "i'm params."
    });

    expect(timeout.get('unit-timeout-get')).toHaveProperty('key', 'unit-timeout-get');
});

test('timeout.size', () => {
    expect(typeof timeout.size()).toBe('number');
});

test('timeout.isRunning', () => {
    let callback = function(){ };
    timeout({
        key:'unit-timeout-isRunning',
        interval:50,
        callback: callback,
        immediately:true,
        keep: true,
        time: 2,
        context: {a:1},
        params: "i'm params."
    });
    expect(timeout.isRunning('unit-timeout-isRunning')).toBe(true);
    timeout.off('unit-timeout-isRunning');
    expect(timeout.isRunning('unit-timeout-isRunning')).toBe(false);
    expect(timeout.isRunning('aaaaaa') instanceof Error).toBe(true);
});

test('timeout.install', () => {
    Vue.use(timeout);
    const app = new Vue();
    expect(typeof app.$timeout).toBe('function');
});

test('timeout.times', done => {
    let callback = function(params){
        expect(params).toBe("i'm params.");
        if( timeout.get('unit-timeout-times').score === 1 ){
            done();
        }
    };
    timeout({
        key:'unit-timeout-times',
        interval:500,
        callback: callback,
        immediately:true,
        keep: false,
        time: 2,
        context: {a:1},
        params: "i'm params."
    });
    expect(timeout.isRunning('unit-timeout-times')).toBe(true);
});

test('timeout.finish', () => {
    timeout({
        key:'unit-timeout-finish',
        interval:1,
        callback: function(params){ params += params; },
        immediately:true,
        keep: false,
        time: 1,
        context: {a:1},
        params: "i'm params."
    });

    setTimeout(function(){
        expect(timeout.get('unit-timeout-finish')).toBe(undefined);
    }, 100);
});