import React from 'react'

// [TODO]: review hack on window.innerWidth to remove on mobile
class CanvasComponent extends React.Component {
	componentDidMount() {
		window.innerWidth > 768 && this.updateCanvas()
	}
	updateCanvas() {
		const stage = document.querySelector('#dots')
		var cb = stage.getBoundingClientRect()
		const ctx = stage.getContext('2d')
		const ratio = window.devicePixelRatio || 1
		const mouse = {x: 0, y: 0}
		const dots = []
		const wide = ctx.canvas.width / 8
		const high = ctx.canvas.height / 8
		const padding = 0

		window.onmousemove = function(e) {
			mouse.x = (e.pageX - cb.left - scrollX) * ratio
			mouse.y = (e.pageY - cb.top) * ratio
		}
		window.onresize = function() {
			ctx.canvas.width = window.innerWidth * ratio
			ctx.canvas.height = window.innerHeight * ratio
			cb = stage.getBoundingClientRect()
		}
		window.onresize()

		function create() {
			for (var i = -1; ++i < wide; ) {
				var x =
					Math.floor(((cb.width - padding * 2) / (wide - 1)) * i + padding) *
					ratio
				for (var j = -1; ++j < high; ) {
					var y =
						Math.floor(((cb.height - padding * 2) / (high - 1)) * j + padding) *
						ratio
					dots.push({x: x, y: y, ox: x, oy: y})
				}
			}
		}
		create()

		function render() {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
			ctx.fillStyle = 'rgba(230,230,230,1)'
			for (var i = 0; i < dots.length; i++) {
				var s = dots[i]
				var v = getV(s)
				ctx.circle(s.x + v.x, s.y + v.y, s.size * ratio, true)
				ctx.fill()
			}
		}

		function getV(dot) {
			var d = getDistance(dot, mouse)
			dot.size = (200 - d) / 30
			dot.size = dot.size < 3 ? 3 : dot.size
			dot.angle = getAngle(dot, mouse)
			return {
				x: (d > 15 ? 15 : d) * Math.cos((dot.angle * Math.PI) / 180),
				y: (d > 15 ? 15 : d) * Math.sin((dot.angle * Math.PI) / 180),
			}
		}

		function getAngle(obj1, obj2) {
			var dX = obj2.x - obj1.x
			var dY = obj2.y - obj1.y
			var angleDeg = (Math.atan2(dY, dX) / Math.PI) * 180
			return angleDeg
		}

		function getDistance(obj1, obj2) {
			var dx = obj1.x - obj2.x
			var dy = obj1.y - obj2.y
			return Math.sqrt(dx * dx + dy * dy)
		}

		CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
			this.beginPath()
			this.arc(x, y, r, 0, 2 * Math.PI, false)
			this.closePath()
		}

		window.requestAnimFrame = (function() {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60)
				}
			)
		})()

		;(function animloop() {
			render()
			requestAnimationFrame(animloop)
		})()
	}
	render() {
		return (
			<canvas
				style={{
					position: 'absolute',
				}}
				id={'dots'}
			/>
		)
	}
}

export default CanvasComponent
