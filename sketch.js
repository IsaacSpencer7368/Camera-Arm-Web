function sketch(p) {
    let ppi = 8, v1, v2, v3

    p.setup = function() {
        p.createCanvas(600, 600)
        p.angleMode(p.DEGREES)
        p.frameRate(30)
        p.strokeWeight(20)
        v1 = p.createVector(l1 * ppi, 0)
        v2 = p.createVector(l2 * ppi, 0)
        v3 = p.createVector(l3 * ppi, 0)
    }

    p.draw = function() {
        if (p.mouseIsPressed) {
            if (increment >= 1) {
                step = 1 / (5000 / 33.33)
                increment = 0
                calculateAngles()
                index++
                // console.log(step)
            }
        }
        p.background(255)
        if (increment < 1) {
            increment += step
            // console.log(increment)
            // const curve = increment * increment * (3 - 2 * increment)
            const curve = increment * increment / (2 * (increment * increment - increment) + 1)
            j1 = p1 + curve * (t1 - p1)
            j2 = p2 + curve * (t2 - p2)
            j3 = p3 + curve * (t3 - p3)
            const pwm1 = mapPulse(j1 - 90, 90, -90, 850, 1960)
            const pwm2 = mapPulse(j2, 90, -90, 650, 1860)
            const pwm3 = mapPulse(j3, 90, -90, 760, 2040)
            const pwm4 = 1190
            const pwm5 = 1630
            if (socket.readyState === socket.OPEN) socket.send(`${pwm1},${pwm2},${pwm3},${pwm4},${pwm5}`)
        }
        v1.setHeading(-p.round(j1))
        v2.setHeading(-p.round(j2))
        v3.setHeading(-p.round(j3))
        p.stroke('blue')
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
        p.stroke('red')
        p.circle(0, 0, 5) // end effector
    }
}
