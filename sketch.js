function sketch1(p) {
    let ppi, v1, v2, v3

    p.setup = function() {
        p.createCanvas(500, 500)
        ppi = p.height / 40
        p.angleMode(p.DEGREES)
        p.frameRate(30)
        p.stroke('blue')
        p.strokeWeight(4)
        v1 = p.createVector(l1 * ppi, 0)
        v2 = p.createVector(l2 * ppi, 0)
        v3 = p.createVector(l3 * ppi, 0)
        calculateAngles()
    }
    p.draw = function() {
        const [gp, junk] = navigator.getGamepads()
        if (gp) {
            if (Math.abs(gp.axes[0]) > 0.1) { // x axis
                x += gp.axes[0] * 0.2
            }
            if (Math.abs(gp.axes[1]) > 0.1) { // z axis
                z -= gp.axes[1] * 0.2
            }
            if (Math.abs(gp.axes[2]) > 0.1) { // pan
                pan += gp.axes[2] * 0.2
            }
            if (Math.abs(gp.axes[3]) > 0.1) { // y axis
                y -= gp.axes[3] * 0.2
            }
            if (gp.buttons[4].pressed) { // rotate CCW
                tilt -= 1
            } else if (gp.buttons[5].pressed) { // rotate CW
                tilt += 1
            }
            if (gp.buttons[6].pressed) { // rotate CCW
                rotation -= 1
            } else if (gp.buttons[7].pressed) { // rotate CW
                rotation += 1
            }
            if (x !== px || y != py || z != pz || tilt != pTilt || pan != pPan || rotation != pRotation) {
                px = x
                py = y
                pz = z
                pTilt = tilt
                pPan = pan
                pRotation = rotation
                calculateAngles()
                // console.log(x, y, z)
            }
        }
        p.background(220)
        v1.setHeading(-p.round(j1))
        v2.setHeading(-p.round(j2))
        v3.setHeading(-p.round(j3))
        p.translate(p.width / 2, 0)
        p.line(0, 0, 0, p.height - zOffset * ppi) // upright
        p.translate(0, p.height - zOffset * ppi)
        p.line(0, 0, v1.x, v1.y) // upper arm
        p.translate(v1.x, v1.y)
        p.rotate(v1.heading())
        p.line(0, 0, v2.x, v2.y) // lower arm
        p.translate(v2.x, v2.y)
        p.rotate(v2.heading())
        p.line(0, 0, v3.x, v3.y) // hand
        p.translate(v3.x, v3.y)
        p.rotate(v3.heading())
    }
}
