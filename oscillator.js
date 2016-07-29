//'use strict';


class Utils {
    static sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

class OscillatorManager {
    
    constructor() {
        // get HTML 5 web audio context
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        if (!this.audioCtx)
            return;
        
        this.createStarted = false;
        this.oscillatorCount = 0;

        return this;
    }

    create(n) { // create oscillators
        if (this.createStarted)
            return this;
        
        this.oscillatorCount = n;
        this.createStarted = true;
        return this;
    }

/*
    play(...chords) {
        for (const chord of chords) {
            yield chord;
        }
        return this;
    }
    
    * [Symbol.iterator]() {

    }

*/


}

function test() {
    OscillatorManager().play('g3, e3, c3');
}

const A4 = 440;
const Steps = {
    0: 'Unison',
    1: '2nd',
    2: '2and',
    3: '3rd',
    4: '3rd',
    5: '4th',
    6: '4th',
    7: '5th',
    8: '6th',
    9: '6th',
    10: '7th',
    11: '7th',
    12: 'Octave'
};



class Oscillator {

    
    step(power) {
        return Math.pow((440 * 1.059463094359), power);
    }

    // a4
    get root() {
        return 440;
    }

    constructor(audioContext) {
        // single audiocontext for many osc or one ctx??
        this.audioContext = audioContext;
        
        if (!this.audioContext)
            return;

        // start with 3 chords
        
    }

    set frequency(oscillator, value) {
        oscillator.frequency.value = value;
        oscillator.type = 'sine';
        return this;
    }

    sleep(sec) {
        Utils.sleep(sec);
        return this;
    }

    stop(oscillator) {
        oscillator.stop();
        return this;
    }

    start(oscillator) {
        oscillator.start();
        return this;
    }

    create() {
        var osc = this.createOscillator();
        var gain = this.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        return {
            oscillator: osc,
            gain: gain
        }
    }

    createOscillator() {
        return this.audioContext.createOscillator();
    }

    createGain() {
        return this.audioContext.createGain();
    }
}



function f() {
    var osc = Oscillator();

    
}