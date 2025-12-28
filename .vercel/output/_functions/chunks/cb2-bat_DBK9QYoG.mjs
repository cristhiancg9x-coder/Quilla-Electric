const cb2Bat = new Proxy({"src":"/_astro/cb2-bat.CAAXfOQ5.png","width":349,"height":285,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/cb2-bat.png";
							}
							
							return target[name];
						}
					});

export { cb2Bat as default };
