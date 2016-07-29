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

    next(frequency) {
        return frequency * 1.059463094359;
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

        this._osc = this.audioContext.createOscillator();
        this._gain = this.audioContext.createGain();

        this._osc.connect(gain);
        this._gain.connect(this.audioContext.destination);
    }

    get note() {
        //let root = this.root();
        //[...Array(6).keys()].map(i => Array(6));
        //let pitchMatrix = [[],[]];
        let pitchMatrix = [...Array(12).keys()].map(i => Array(9));
        let keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
        let prev = 0;
        for (let i = 0; i < keys.length; i++) {
            for (let j = 0; j < 9; j++) {
                pitchMatrix[i][j] = {
                    'name': keys[i] + j.toString(),
                    'note': j.toString(),
                    'pitch': keys[i],
                    'frequency': (i == 0 && j == 0) ?
                        16.35 :// first
                        this.next(prev)
                };
                prev = pitchMatrix[i][j].frequency;
            }
        }
        this.pitchMatrix = pitchMatrix;
    }

    printPitchMatrix() {
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 9; j++) {
                console.log(this.pitchMatrix[i][j]);
            }
        }
    }


    playNote(note, time) {
        //fixme: use some other value
        if (note == -1) {
            // rand
        }

        let osc = this.create();
        this.frequency(196);
        osc.oscillator.start();
        this.sleep(time);
        osc.oscillator.stop();
    }



    set frequency(frequency) {
        this._osc.frequency.value = frequency;
        this._osc.type = 'sine';
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
        return this;
    }


}



function f() {
    var osc = new Oscillator();


}