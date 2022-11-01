"use strict";

import $, { nodeName } from 'jquery'
window.jQuery = $
window.$ = $

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

	var mainNavigation = document.querySelector('.main_navigation');

	window.addEventListener('scroll', ()=> {
		if (window.pageYOffset > 90) {
			mainNavigation.classList.add('header_scrolled')
		} else {
			mainNavigation.classList.remove('header_scrolled')
		}
	})

	// gsap.to("feDisplacementMap", {
	// 	scrollTrigger: ".hero_section__container_title",
	// 	attr: {scale: 0},
	// 	duration: 0.8,
	// });

	gsap.to("feDisplacementMap", {
		duration: 0.8,
   	attr: {scale: 0},
		scrollTrigger: {
			trigger: ".hero_section__container_title",
			start:"bottom",
			end: "+=500",
			toggleActions: "none reset reset play ",
			// markers: true,
		}
	});


	const splitText = (selector) => {
		const elem = document.querySelector(selector);
		const text = elem.innerText;
		const chars = text.split("");
		const charsContainer = document.createElement("div");
		const charsArray = [];
	
		charsContainer.style.position = "relative";
		charsContainer.style.display = "inline-block";
	
		chars.forEach((char) => {
			const charContainer = document.createElement("div");
	
			charContainer.style.position = "relative";
			charContainer.style.display = "inline-block";
			charContainer.innerText = char;
			charsContainer.appendChild(charContainer);
	
			charsArray.push(charContainer);
		});
		// remove current text
		elem.innerHTML = "";
		// append new structure
		elem.appendChild(charsContainer);
	
		return charsArray;
	};
	
	const animate = function (text) {
		const chars = splitText(".preloader__text");

		var tl = gsap.timeline();

		return tl.from(chars, {
			duration: 0.3,
			beforeStart: function() {
        $('.preloader__text').css({'opacity' : '1'});
    	},
			y: '55vh',
			stagger: 0.1,
			delay: 0.9
		})
		.to('.preloader', {
			height: "1px",
			padding: 0,
			onComplete: function() {
				$('.preloader').css({'backgroundColor' : 'white'});
				$('.preloader').css({'background' : 'none'});
				$('.preloader canvas').hide();
				$('.light_theme').css({'background' : 'none'});
				ScrollTrigger.refresh();
			}})
		.to("feDisplacementMap", {
			beforeStart: function() {
        $('.hero_section__container_title').css({'opacity' : '1'});
    	},
			attr: {scale: 0},
			duration: 0.8,
		})
		;
	};
	
	animate(".preloader__text");


	class GradientAnimation {
		constructor(canvas, circles, min, max, nx1) {
			// this.cnv = document.querySelector(`canvas`);
			this.cnv = canvas;
			this.ctx = this.cnv.getContext(`2d`);
			
			this.nx = nx1;
			this.circlesNum = circles;
			this.speed =  .01;
			this.minRadius = min;
			this.maxRadius = max;

			this.setCanvasSize();
			this.createCircles();
			this.drawAnimation();

			window.onresize = () => {
				this.setCanvasSize();
				this.createCircles();
			}
		}

		setCanvasSize() {
			this.w = this.cnv.width  = innerWidth;
			this.h = this.cnv.height = innerHeight;
		}

		createCircles() {
			this.circles = [];
			for (let i = 0; i < this.circlesNum; ++i) {
				this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius, this.nx));
			}
		}

		drawCircles() {
			this.circles.forEach(circle => circle.draw(this.ctx, this.speed))
		}

		clearCanvas() {
			this.ctx.clearRect(0,0, this.w, this.h);
		}

		drawAnimation() {
			this.clearCanvas();
			this.drawCircles();
			window.requestAnimationFrame(() => this.drawAnimation());
		}
	}
	class Circle {
		constructor(w, h, minR, maxR, nx) {
			if (nx != 1) {
				this.x = Math.random() * w;
    		this.y = Math.random() * h;
			} else if(nx == 2) {
				this.x = w;
				this.y = h;
			} else {
				this.x = 1 * w;
				this.y = 0 * h;
			}

			this.angle = Math.random() * 2 * Math.PI;
			this.radius = Math.random() * (maxR - minR) + minR;
			// this.radius = 50;
			if(nx == 2) {
				this.firstColor = `	hsl(14, 100%, 50%)`;
				this.secondColor = `hsla(14, 100%, 50%, 0)`;
			} else {
				this.firstColor = `	hsl(234, 87%, 66%)`;
				this.secondColor = `hsla(234, 87%, 66%, 0)`;
			}
		}

		draw(ctx, speed) {
			this.angle += speed;
			const x = this.x + Math.cos(this.angle) * 200;
			const y = this.y + Math.sin(this.angle) * 200;
			const gdradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
						gdradient.addColorStop(0, this.firstColor);
						gdradient.addColorStop(1, this.secondColor);

			ctx.globalCompositeOperation = `overlay`;
			ctx.fillStyle = gdradient;
			ctx.beginPath();
			ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
			ctx.fill();
		}
	}

	var cnv1 = document.querySelector(`.canvas1`);
	var cnv2 = document.querySelector(`.canvas2`);
	var cnv3 = document.querySelector(`.canvas3`);
	var cnv4 = document.querySelector(`.canvas4`);


	if (window.screen.width > 768) {
	new GradientAnimation(cnv1, 3, 400, 800, 0);

		new GradientAnimation(cnv2, 1, 200, 300, 1);
		new GradientAnimation(cnv3, 1, 250, 250, 2);
	new GradientAnimation(cnv4, 3, 400, 800, 0);

	}


	gsap.utils.toArray(".panel").forEach((panel, i) => {
		ScrollTrigger.create({
			trigger: panel,
			start: "top 15%", 
			end: "top 15%",
			pin: true,
			pinSpacing: false,
			endTrigger: ".end",
			// markers: true,
		});
	});

	if (window.screen.width > 1200) {
		gsap.utils.toArray(".dark_transition").forEach((panel, i) => {
			ScrollTrigger.create({
				trigger: panel,
				start: "top 10%", 
				end: "top 10%",
				pin: true,
				pinSpacing: false,
				endTrigger: ".end_transition",
				// markers: true,
			});
		});
	}


	gsap.to("feDisplacementMap", {
		scrollTrigger: {trigger:".features-hero__container", toggleActions: "play reset play reset ",},
		attr: {scale: 0},
		duration: 0.8,
	});

	gsap.to("feDisplacementMap", {
		duration: 0.8,
   	attr: {scale: 0},
		scrollTrigger: {
			trigger: ".features-hero__container",
			start:"bottom",
			end: "+=500",
			toggleActions: "none reset reset play ",
		}
	});

	gsap.to("feDisplacementMap", {
		scrollTrigger: {trigger:".calltoaction__container", toggleActions: "play reset play reset ",},
		attr: {scale: 0},
		duration: 0.8,
	});

	gsap.to("feDisplacementMap", {
		duration: 0.8,
   	attr: {scale: 0},
		scrollTrigger: {
			trigger: ".calltoaction__container",
			start:"bottom",
			end: "+=100",
			toggleActions: "none reset reset play ",
		}
	});

	
	var aminList = document.querySelector(".animated-list__container");
	ScrollTrigger.create({
		start: 0,
		end: "max",
		onUpdate: updateValues
	});
	
	function updateValues() {
		if (ScrollTrigger.isInViewport(aminList)) { 
			aminList.classList.add('is-inview');
		} else {
			aminList.classList.remove('is-inview');
		}
	}
	updateValues();

	var footer = document.querySelector(".footer");
	ScrollTrigger.create({
		start: 0,
		end: "max",
		onUpdate: updateValuesFoot
	});
	
	function updateValuesFoot() {
		if (ScrollTrigger.isInViewport(footer)) { 
			footer.classList.add('in-view');
		} else {
			footer.classList.remove('in-view');
		}
	}
	updateValuesFoot();


	var slides = document.querySelectorAll('.slider__container__slider_wrapper_slide');

	function next(arr) {
		var max = arr.length - 1,
			i = -1;
		return function () {
			i = i < max ? i + 1 : 0;
			return arr[i];
		};
	}

		var slider = next(slides);
		var curent;
		setInterval(function () {
			if (curent) $(curent).removeClass('active');
			curent = slider();
			$(curent).addClass('active');
		}, 5000);

	$('.go_contact').on("click", () => {
		$('.go_contact_select').addClass('active');
		setInterval(function () {
			$('.go_contact_select').removeClass('active');
		}, 15000);
	});

	$('.go_carier').on("click", () => {
		$('.go_carier_select').addClass('active');
		setInterval(function () {
			$('.go_carier_select').removeClass('active');
		}, 15000);
	});


	$('.accordion-item .heading').on('click', function(e) {
		e.preventDefault();

		if($(this).closest('.accordion-item').hasClass('active')) {
			$('.accordion-item').removeClass('active');
		} else {
			$('.accordion-item').removeClass('active');
			$(this).closest('.accordion-item').addClass('active');
		}
		
		var $content = $(this).next();
		$content.slideToggle(200);
		$('.accordion-item .content').not($content).slideUp('fast');
	});


	if (window.screen.width < 768) { 
		$('.about__container__accordion_wrapper').remove();
	}


})
