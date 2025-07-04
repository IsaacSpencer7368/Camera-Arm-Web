class Arm {
    constructor() {
        this.x = 1000
        this.y = 1000
        this.z = 1000
        this.pan = 1000
        this.rotation = 1000
        this.px = 0
        this.py = 0
        this.pz = 0
        this.ppan = 0
        this.protation = 0
        const positions = JSON.parse(localStorage.getItem('positions'))
        if (positions) {
            this.x = positions.x
            this.y = positions.y
            this.z = positions.z
            this.pan = positions.pan
            this.rotation = positions.rotation
        }
    }

    map(x, in_min, in_max, out_min, out_max) {
        return Math.floor((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
    }

    sendPositions(s) {
        if (this.x != this.px ||
            this.y != this.py ||
            this.z != this.pz ||
            this.pan != this.ppan ||
            this.rotation != this.protation
        ) {
            s.send(`${this.x},${this.y},${this.z},${this.pan},${this.rotation}`)
            this.px = this.x
            this.py = this.y
            this.pz = this.z
            this.ppan = this.pan
            this.protation = this.rotation
            localStorage.setItem('positions', JSON.stringify({
                x: this.x,
                y: this.y,
                z: this.z,
                pan: this.pan,
                rotation: this.rotation
            }))
        }
    }

    updateX(c) {
        this.x += this.map(c, -1, 1, -2, 2)
        if (this.x < 1430) this.x = 1430
        if (this.x > 2000) this.x = 2000
    }

    updateY(c) {
        this.y += this.map(c, -1, 1, -2, 2)
        if (this.y < 1250) this.y = 1250
        if (this.y > 1875) this.y = 1875
    }

    updateZ(c) {
        this.z += this.map(c, -1, 1, -5, 5)
        if (this.z < 790) this.z = 790
        if (this.z > 2050) this.z = 2050
    }

    updatePan(c) {
        this.pan += this.map(c, -1, 1, -10, 10)
        if (this.pan < 575) this.pan = 575
        if (this.pan > 1825) this.pan = 1825
    }

    updateRotation(c) {
        this.rotation += c
        if (this.rotation < 980) this.rotation = 980
        if (this.rotation > 2245) this.rotation = 2245
    }
}