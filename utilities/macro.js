const { UI_DURATION } = require('../data/durations');
module.exports = class Macro {
    constructor (Name, mods = {}) {
        const TimeCreated = new Date().toISOString().replace(/[^\dT]/g, "").substring(0,15);
        this.next = 1000;
        this.content = Object.assign({},{
            TimeCreated,
            Name,
            Events: [],
            LoopType: "TillLoopNumber",
            LoopNumber: 1,
            LoopTime: 0,
            LoopInterval: 0,
            Acceleration: "1.0",
            PlayOnStart: false,
            DonotShowWindowOnFinish: false,
            RestartPlayer: false,
            RestartPlayerAfterMinutes: 60,
            ShortCut: "",
            UserName: "",
            MacroId: "",
        }, mods);
    }

    addEvent ({ duration = 50, ...rest }) {
        this.content.Events.push({...rest, Timestamp: this.next})
        this.next += duration;
    }

    sleep (duration = 0) {
        // Sleeping for long durations seems like it might stop the macro.... limit to 10s
        let start = this.next;
        while (this.next - start < duration) {
            this.addKey('2');
            this.addKey('2');
            const passed = this.next - start;
            const left = Math.max(0, duration - (this.next - start))
            this.next += Math.min(10000, left);
        }
    }

    addKey (KeyName, duration = UI_DURATION) {
        this.addEvent({ KeyName, EventType: 'KeyDown' });
        this.addEvent({ KeyName, EventType: 'KeyUp', duration });
    }

    addClicks (locations, duration = UI_DURATION){
        locations.forEach(loc => this.addClick(loc, duration));
    }

    addClick (location, duration = UI_DURATION){
        const Delta = 0;
        this.addEvent({ ...location, Delta, EventType: 'MouseDown' });
        this.addEvent({ ...location, Delta, EventType: 'MouseUp', duration });
    }

    addDrag ({ X: startX, Y: startY }, { X: endX, Y: endY }, duration = 6) {
        const Delta = 0;
        this.addEvent({
            X: startX,
            Y: startY,
            Delta,
            EventType: 'MouseDown',
        });
        const xD = endX - startX; // 0
        const yD = endY - startY; // -77
        const scale = 1;
        let xFactor, yFactor;
        if (xD && yD) {
            xFactor = xD / yD * scale;
            yFactor = yD / xD * scale;
        } else {
            xFactor = xD < 0 ? -(scale) : xD && scale;
            yFactor = yD < 0 ? -(scale) : yD && scale;
        }

        const steps = Math.floor(Math.max(Math.abs(yD), Math.abs(xD))) / scale; // 77 / .1 = 770
        for ( let i = 1; i < steps; i++) {
            const X = +(startX + (i * xFactor)).toFixed(2);
            const Y = +(startY + (i * yFactor)).toFixed(2);
            this.addEvent({
                duration,
                X,
                Y,
                Delta,
                EventType: 'MouseMove',
            });
        };
        this.addEvent({
            duration: 1000, // Prevent "toss" effect
            X: endX,
            Y: endY,
            Delta,
            EventType: 'MouseMove',
        });
        this.addEvent({
            duration: 1000, // Let the "edge bounce" settle
            X: endX,
            Y: endY,
            Delta,
            EventType: 'MouseUp',
        });
    }
}
