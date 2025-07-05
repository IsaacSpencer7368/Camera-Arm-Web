function sketch(p) {
    let ppi, v1, v2, v3

    p.setup = function() {
        p.createCanvas(400, 400)
        ppi = p.height / 4 / 20
        p.angleMode(p.DEGREES)
        p.frameRate(30)
        p.stroke('blue')
        p.strokeWeight(4)
        v1 = p.createVector(l1 * ppi, 0)
        v2 = p.createVector(l2 * ppi, 0)
        v3 = p.createVector(l3 * ppi, 0)
    }
    p.draw = function() {
        const [gp, junk] = navigator.getGamepads()
        if (p.mouseIsPressed && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            my = (p.mouseX / ppi - p.width / 8 / ppi)
            mz = (p.height / ppi - p.mouseY / ppi)
            console.log(`Mouse: ${my}, ${mz}`)
            y = my
            z = mz
            calculateAngles()
        }
        if (gp) {
            if (Math.abs(gp.axes[0]) > 0.1) { // x axis
                x += gp.axes[0] * 0.25
            }
            if (Math.abs(gp.axes[1]) > 0.1) { // z axis
                z -= gp.axes[1] * 0.25
            }
            if (Math.abs(gp.axes[2]) > 0.1) { // pan
                pan += gp.axes[2] * 0.25
            }
            if (Math.abs(gp.axes[3]) > 0.1) { // y axis
                y += gp.axes[3] * 0.25
            }
            if (gp.buttons[0].pressed) { // home
                s3 = 1.0 / (positions[0].t3 * 1000 / 33.33)
                i3 = 0
                setTimeout(() => {
                    x = 0
                    y = 8
                    z = 58
                    tilt = 0
                    pan = 0
                    rotation = 0
                }, positions[0].t3 * 1000)
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
            }
        }
        if (i3 < 1.0) {
            i3 += s3
            const curve = i3 * i3 / (2.0 * (i3 * i3 - i3) + 1.0)

        }
        p.background(220)
        v1.setHeading(-p.round(j1))
        v2.setHeading(-p.round(j2))
        v3.setHeading(-p.round(j3))
        p.translate(p.width / 8, p.height - zOffset * ppi)
        p.line(0, 0, 0, zOffset * ppi) // upright
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
