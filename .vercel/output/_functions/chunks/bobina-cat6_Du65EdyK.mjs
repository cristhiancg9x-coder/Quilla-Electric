const bobinaCat6 = new Proxy({"src":"/_astro/bobina-cat6.BYbKTesX.png","width":584,"height":481,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/bobina-cat6.png";
							}
							
							return target[name];
						}
					});

export { bobinaCat6 as default };
